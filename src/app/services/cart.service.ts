import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Response} from "../models/response";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {TokenStorageService} from "./token-storage.service";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient,private tokenStorage:TokenStorageService) { }

  public get():any {
    return this.http.get<Response>(`${environment.apiBaseUrl}/cart/${this.tokenStorage.getSessionId()}/${this.tokenStorage.getUser()._id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken()),
    }).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }

  public addToCart(product:Product){
    let url =`${environment.apiBaseUrl}/cart/add-item`;
    console.log("Add Product:",url)
    return this.http.post<Response>(url,product,{headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken())}).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }

  public totalProductInCart(){
    return this.http.get<Response>(`${environment.apiBaseUrl}/cart/count/items/${this.tokenStorage.getSessionId()}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken()),
    }).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }

}
