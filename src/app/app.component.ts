import { Component } from '@angular/core';
import {User} from "./models/user";
import {Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medicare-portal';
  currentUser: any;
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.currentUser.subscribe(x => {
      if(x !== null) {
        console.log("UserX:",x)
        this.currentUser = x
      }else {
        this.logout()
      }
    });
  }
  logout() {
    this.loginService.logout();
  }

}
