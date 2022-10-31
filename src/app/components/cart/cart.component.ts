import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  id:any
  product:any
  cart?:any
  public photoBaseUrl = `${environment.productPhotoBaseUrl}`
  totalItems:Number = 0
  cartForm: FormGroup;
  constructor(private route:ActivatedRoute,private cartService:CartService,private tokenStorage:TokenStorageService,private router:Router,private formBuilder:FormBuilder) {
    this.cartForm = new FormGroup<any>({})
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    console.log("productId",this.id,this.tokenStorage.getSessionId())
    this.cartService.addToCart({sessionId:this.tokenStorage.getSessionId(),productId:this.id,user:this.tokenStorage.getUser()._id}).subscribe(response => {
      console.log("Add Cart response:",response)
    })

    this.cartService.get().subscribe((response: any) => {
      console.log("Cart Response",response)
      this.cart = response
    })

    this.cartService.totalProductInCart().subscribe(response => {
      console.log("Total Items",response)
      this.totalItems = response
    })

    this.router.navigate(['/cart'])
    this.cartForm = this.formBuilder.group({
      quantity: new FormControl("",[Validators.required]),
      productId:new FormControl("",[Validators.required]),
      cartId:new FormControl("",[Validators.required])
    })
  }

  proceedCheckout() {

  }
}
