import {Component, OnDestroy, OnInit} from '@angular/core';
import {SettingService} from "../../services/setting.service";
import {CheckoutService} from "../../services/checkout.service";
import {Invoice} from "../../models/invoice";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit ,OnDestroy{
  public settings:any
  public invoice?:Invoice
  public $subs?:Subscription
  constructor(private settingService:SettingService,private checkoutService:CheckoutService) { }

  ngOnInit(): void {
    this.settingService.get().subscribe(sets => {
      this.settings = sets
    })

    this.$subs = this.checkoutService.getInvoice().subscribe(invoice => {
      console.log("Invoice:",invoice)
      this.invoice = invoice
    })
  }

  ngOnDestroy(): void {
    this.$subs?.unsubscribe()
  }

}
