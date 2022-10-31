import { Component } from '@angular/core';
import {User} from "./models/user";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medicare-portal';
  returnUrl: string = "";
  currentUser: any;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private route: ActivatedRoute) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginService.currentUser.subscribe(x => {
      if(x !== null) {
        console.log("UserX:",x)
        this.currentUser = x
        //this.router.navigate([this.returnUrl]);
      }else {
        this.logout()
      }
    });
  }
  logout() {
    this.loginService.logout();
  }

}
