import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private tokenStorage:TokenStorageService) { }

  public get() {
    return this.http.get<Response>(`${environment.apiBaseUrl}/product`,{headers:new HttpHeaders().set('Content-Type', 'application/json')}).pipe(map(response => {
      console.log(response)
      return response;
    }))
  }
  public getById(id:String) {
    return this.http.get<Response>(`${environment.apiBaseUrl}/product/${id}`,{headers:new HttpHeaders().set('Content-Type', 'application/json')}).pipe(map(response => {
      console.log(response)
      return response;
    }))
  }
  public getByCategory(id:String) {
    return this.http.get<Response>(`${environment.apiBaseUrl}/product/category/${id}`,{headers:new HttpHeaders().set('Content-Type', 'application/json')}).pipe(map(response => {
      console.log(response)
      return response;
    }))
  }
}
