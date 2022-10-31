import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {CategoryService} from "../../services/category.service";
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {CartService} from "../../services/cart.service";

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
  constructor(private categoryService:CategoryService,private productService:ProductService,private route: ActivatedRoute,private cart:CartService) { }

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

  addToCart(){

  }




}
