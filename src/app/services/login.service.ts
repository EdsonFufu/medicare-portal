import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models/user";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {environment} from "../../environments/environment";
import { map } from 'rxjs/operators';
interface SignUp {
  first_name:string
  last_name:string
  email:string
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient,private tokenStorage:TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(tokenStorage.getUser());
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  login(username:string, password:string) {
    const payload = { username, password }
    console.log("Payload",payload)
    console.log(`${environment.apiBaseUrl}/login`)
    return this.http.post<any>(`${environment.apiBaseUrl}/login`, payload,  {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
      .pipe(map(response => {
        console.log(response)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.tokenStorage.saveToken(response.body.token);
        this.tokenStorage.saveUser(response.body.user)
        this.currentUserSubject.next(response.body.user);
        return response.body.user;
      }));
  }
  createAccount(signUp:SignUp){
    console.log("Payload",signUp)
    console.log(`${environment.apiBaseUrl}/login`)
    return this.http.post<any>(`${environment.apiBaseUrl}/signup`, signUp,  {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    })
      .pipe(map(response => {
        console.log(response)
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.tokenStorage.saveToken(response.body.token);
        this.tokenStorage.saveUser(response.body.user)
        this.currentUserSubject.next(response.body.user);
        return response.body.user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    this.tokenStorage.signOut();
    // @ts-ignore
    this.currentUserSubject.next(null);
  }
}
