import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Response} from "../models/response";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {TokenStorageService} from "./token-storage.service";
import {Product} from "../models/product";
import {CartDetail} from "../models/cart-detail";
import {Observable, Subject} from "rxjs";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new Subject<CartDetail>()

  constructor(private http:HttpClient,private tokenStorage:TokenStorageService,private alertService:AlertService) { }

  public get():any {
    return this.http.get<Response>(`${environment.apiBaseUrl}/cart/${this.tokenStorage.getUser()._id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken()),
    }).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }

  public addToCart(product:Product):Observable<CartDetail>{
    let url =`${environment.apiBaseUrl}/cart/add-item`;
    return this.http.post<Response>(url,product,{headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken())}).pipe(map(response => {
      console.log("Product Added Successful",response)
      this.alertService.success("Product Added Successful",true)
      return response.body;
    }));
  }

  public totalProductInCart(){
    return this.http.get<Response>(`${environment.apiBaseUrl}/cart/count/items/${this.tokenStorage.getUser()._id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken()),
    }).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }

  public sendCartDetail(cart:CartDetail){
    console.log("CartDetail:",cart)
    this.cart.next(cart)
  }

  public getCartDetail(){
    return this.cart.asObservable().pipe(map(cart => {
      console.log("Subject:",cart)
      return cart;
    }))
  }

}
