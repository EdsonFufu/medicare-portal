import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {environment} from "../../../environments/environment";
import {CartService} from "../../services/cart.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {Product} from "../../models/product";
import {Subscription} from "rxjs";
import {CartDetail} from "../../models/cart-detail";
import {ProductDetail} from "../../models/product-detail";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit ,OnDestroy{

  private id: any
  public product?:ProductDetail | any
  public categories:any
  public baseUrl = `${environment.baseUrl}/`
  public photoBaseUrl = `${environment.productPhotoBaseUrl}`
  public $subsCart?:Subscription

  constructor(private categoryService:CategoryService,private productService:ProductService,private route: ActivatedRoute,private cartService:CartService,private tokenStorate:TokenStorageService,private router:Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    if(this.id){
      this.productService.getById(this.id).subscribe(response => {
        this.product = response.body
      },err => {
        console.log(err)
      });
    }
    this.categoryService.get().subscribe(response => {
      this.categories = response.body
    },error => {
      console.log("Failed to get categories")
    })
  }

  addToCart(productId: String) {
    let product:Product = {productId,sessionId:this.tokenStorate.getSessionId(),user:this.tokenStorate.getUser()._id}
    console.log("Product:",product)
    this.$subsCart = this.cartService.addToCart(product).subscribe(cart => {
      this.cartService.sendCartDetail(cart)
    })
    this.router.navigate(["/cart"])
  }

  ngOnDestroy(): void {
    this.$subsCart?.unsubscribe()
  }
}
