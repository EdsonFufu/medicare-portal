import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {CategoryService} from "../../services/category.service";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  private id: any
  public product:any
  public categories:any
  public baseUrl = `${environment.baseUrl}/`
  public photoBaseUrl = `${environment.productPhotoBaseUrl}`

  constructor(private categoryService:CategoryService,private productService:ProductService,private route: ActivatedRoute) { }

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

}
