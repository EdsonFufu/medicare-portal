import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {TokenStorageService} from "./token-storage.service";
import {map} from "rxjs/operators";
import {Response} from "../models/response";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient,private tokenStorate:TokenStorageService) { }
  public get(){
    console.log(this.tokenStorate.getToken())
    return this.http.get<Response>(`${environment.apiBaseUrl}/category`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(map(response => {
      console.log(response)
      return response;
    }));
  }
  public getById(id:String){
    return this.http.get<Response>(`${environment.apiBaseUrl}/category/${id}`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(map(response => {
      console.log(response)
      return response;
    }));
  }
}
