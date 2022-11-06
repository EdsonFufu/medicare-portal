import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {CartDetail} from "../models/cart-detail";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {AlertService} from "./alert.service";
import {Response} from "../models/response";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Product} from "../models/product";
import {Invoice} from "../models/invoice";

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  public invoice = new Subject<Invoice>()

  constructor(private http:HttpClient,private tokenStorage:TokenStorageService,private alertService:AlertService) { }

  public get():any {
    return this.http.get<Response>(`${environment.apiBaseUrl}/invoice/${this.tokenStorage.getUser()._id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken()),
    }).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }

  public createInvoice(payload:any):Observable<Invoice>{
    let url =`${environment.apiBaseUrl}/checkout`;
    return this.http.post<Response>(url,payload,{headers: new HttpHeaders().set('Content-Type', 'application/json').set('Authorization','Bearer ' + this.tokenStorage.getToken())}).pipe(map(response => {
      console.log("Invoice Created Successful",response)
      this.alertService.success("Invoice Created Successful",true)
      return response.body;
    }));
  }

  public sendInvoice(invoice:Invoice){
    console.log("CartDetail:",invoice)
    this.invoice.next(invoice)
  }

  public getInvoice(){
    return this.invoice.asObservable().pipe(map(invoice => {
      console.log("Subject:",invoice)
      return invoice;
    }))
  }

}
