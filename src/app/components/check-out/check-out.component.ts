import {Component, OnDestroy, OnInit} from '@angular/core';
import {CartDetailService} from "../../services/cart-detail.service";
import {Cart} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {SettingService} from "../../services/setting.service";
import {Settings} from "../../models/settings";
import {Subscription} from "rxjs";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenStorageService} from "../../services/token-storage.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";
import {Invoice} from "../../models/invoice";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  public cartDetail: Cart | undefined
  public settings:Settings | undefined
  public cart?:any
  public $subs: Subscription | undefined
  public checkoutForm:FormGroup
  public invoice?:Invoice


  constructor(private cartDetailService:CartDetailService,private cartService:CartService,private settingService:SettingService,private formBuilder:FormBuilder,private tokenStorage:TokenStorageService,private checkoutService:CheckoutService, private router:Router) {
    this.checkoutForm = new FormGroup<any>({})
  }

  ngOnInit(): void {
    this.$subs = this.cartDetailService.getCartDetailForCheckout().subscribe(cartDetail => {
      this.cartDetail = cartDetail
      console.log("CartSubject:",cartDetail)
    })

    this.cartService.get().subscribe((response: any) => {
      console.log("Cart Response",response)
      this.cart = response
    })

    this.settingService.get().subscribe(settings => {
      console.log("Settings:",settings)
      this.settings = settings
    })

    this.checkoutForm = this.formBuilder.group({
      email:new FormControl(""),
      mobile:new FormControl("255",[Validators.required]),
      address:new FormControl("P.O BOX",[Validators.required]),
      city:new FormControl("Dar es Salaam",[Validators.required]),
      postalCode:new FormControl("00255",[Validators.required]),
      country:new FormControl("Tanzania",[Validators.required]),
      user:new FormControl(this.tokenStorage.getUser()._id,[Validators.required]),
      paymentMethod: new FormControl("",[Validators.required])
    })

    this.checkoutForm.valueChanges.subscribe(data => console.log(data));

  }

  ngOnDestroy(): void {
      if (this.$subs != undefined) this.$subs.unsubscribe()
  }

  placeOrder() {
    const {user,paymentMethod} = this.checkoutForm.value;
    const { email, mobile, address,country,city,postalCode} = this.checkoutForm.value;

    const order = {user,paymentMethod}

    const contact = {email, mobile, address,country,city,postalCode,user}

    const payload = {order,contact}
    console.log("Payload",payload)

    const invoice = this.checkoutService.createInvoice(payload).subscribe(invoice => {
      this.invoice = invoice
      this.checkoutService.sendInvoice(invoice);
    })

    if(this.invoice){
      this.router.navigate(["/invoice"])
    }

  }
}
