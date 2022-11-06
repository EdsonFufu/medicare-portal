import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {Product} from "../../models/product";
import {TokenStorageService} from "../../services/token-storage.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public products:any
  public id:any
  public categories:any
  public apiBaseUrl = `${environment.apiBaseUrl}`
  public baseUrl = `${environment.baseUrl}/`
  public photoBaseUrl = `${environment.productPhotoBaseUrl}`
  public $subsCart?:Subscription
  constructor(private categoryService:CategoryService,private productService:ProductService,private route: ActivatedRoute,private cart:CartService,private tokenStorate:TokenStorageService,private cartService:CartService,private router:Router) { }

  ngOnInit(): void {
     this.categoryService.get().subscribe(response => {
       this.categories = response.body
    },error => {
       console.log("Failed to get categories")
     })

    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.productService.getByCategory(this.id).subscribe(response => {
        this.products = response.body
      },err => {
        console.log(err)
      });
    }else {
      this.productService.get().subscribe(response => {
        this.products = response.body
      },err => {
        console.log(err)
      });
    }

  }

  addToCart(productId: String) {
    let product:Product = {productId,sessionId:this.tokenStorate.getSessionId(),user:this.tokenStorate.getUser()._id}
    console.log("Product:",product)
    this.$subsCart = this.cartService.addToCart(product).subscribe(cart => {
      this.cartService.sendCartDetail(cart)
    })

    const confirmBox = confirm("Product Added to Cart, Click Okay to View Cart or Cancel to Continue")
    if(confirmBox){
      this.router.navigate(["/cart"])
    }
  }

  ngOnDestroy(): void {
    this.$subsCart?.unsubscribe()
  }


}
