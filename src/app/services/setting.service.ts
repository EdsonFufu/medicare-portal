import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {Response} from "../models/response";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Settings} from "../models/settings";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(private http:HttpClient) { }

  public get():Observable<Settings> {
    return this.http.get<Response>(`${environment.apiBaseUrl}/settings`,{
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    }).pipe(map(response => {
      console.log(response)
      return response.body;
    }));
  }
}
