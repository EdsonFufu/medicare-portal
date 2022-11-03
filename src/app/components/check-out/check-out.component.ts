import { Component, OnInit } from '@angular/core';
import {CartDetailService} from "../../services/cart-detail.service";
import {Cart} from "../../models/cart";
import {CartService} from "../../services/cart.service";
import {SettingService} from "../../services/setting.service";
import {Settings} from "../../models/settings";

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  public cartDetail: Cart | undefined
  public settings:Settings | undefined
  public cart?:any

  public vat:any
  public total:any



  constructor(private cartDetailService:CartDetailService,private cartService:CartService,private settingService:SettingService) { }

  ngOnInit(): void {
    this.cartDetailService.cardDetailSubject.subscribe(cart => {
      this.cart = cart
      console.log("CartSubject:",cart)
    })
    this.cartService.get().subscribe((response: any) => {
      console.log("Cart Response",response)
      this.cart = response
    })

    this.settingService.get().subscribe(settings => {
      console.log("Settings:",settings)
      this.settings = settings
    })

    if(this.settings != undefined && this.cart != null){
      this.vat = this.cart.total * this.settings.tax / 100
      this.total = this.vat + this.cart.total + this.settings.shipping
    }
  }

}
