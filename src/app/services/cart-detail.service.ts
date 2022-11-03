import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Cart} from "../models/cart";

@Injectable({
  providedIn: 'root'
})
export class CartDetailService {

  public cardDetailSubject = new Subject<Cart>();

  constructor() { }

  public sendCartDetailForCheckout(cart:Cart){
    this.cardDetailSubject.next(cart)
  }
}
