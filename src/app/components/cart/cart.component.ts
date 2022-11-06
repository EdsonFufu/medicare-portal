import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute,Router} from "@angular/router";
import {CartService} from "../../services/cart.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {environment} from "../../../environments/environment";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CartDetailService} from "../../services/cart-detail.service";
import {CartDetail} from "../../models/cart-detail";
import {Subscription} from "rxjs";
import {SettingService} from "../../services/setting.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnDestroy {
  id:any
  product:any
  cart?:CartDetail
  public photoBaseUrl = `${environment.productPhotoBaseUrl}`
  totalItems:Number = 0
  cartForm: FormGroup;
  $subsCartDtl?:Subscription
  constructor(private route:ActivatedRoute,private cartService:CartService,private tokenStorage:TokenStorageService,private router:Router,private formBuilder:FormBuilder,private cartDetailService:CartDetailService,private settingsService:SettingService) {
    this.cartForm = new FormGroup<any>({})
  }

  ngOnInit(): void {

    this.$subsCartDtl = this.cartService.getCartDetail().subscribe(cart => {
      console.log("ObservableCartDetail",cart)
      this.cart = cart
    },error => {
      console.log("Error:",error)
    })


    this.cartService.get().subscribe((response: any) => {
      console.log("Cart Response",response)
      this.cart = response
    })

    this.cartService.totalProductInCart().subscribe(response => {
      console.log("Total Items",response)
      this.totalItems = response
    })

    this.cartForm = this.formBuilder.group({
      sessionId: new FormControl(this.tokenStorage.getSessionId(),[Validators.required]),
      user:new FormControl(this.tokenStorage.getUser()._id,[Validators.required])
    })
  }
  proceedCheckout() {
    this.cartDetailService.sendCartDetailForCheckout(this.cartForm.getRawValue())
    this.router.navigate(["/checkout"]);
  }

  ngOnDestroy(): void {
    this.$subsCartDtl?.unsubscribe()
  }

}
