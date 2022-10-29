import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../services/login.service";
import {TokenStorageService} from "../../services/token-storage.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedIn = false
  private user: User | undefined

  constructor(private loginService:LoginService,private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    if(this.tokenStorageService.getUser()){
      console.log("UserHeader:",this.tokenStorageService.getUser())
      this.loggedIn = true
    }else {
      console.log("User not Logged In")
      this.loggedIn = false
    }
  }
  isLoggedIn() {
    return this.loggedIn
  }

  logout(){
    this.loginService.logout()
    window.location.reload();
  }



}
