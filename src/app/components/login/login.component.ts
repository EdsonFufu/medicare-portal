import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm:FormGroup

  constructor(private loginService:LoginService,private router:Router) {
    this.loginForm = new FormGroup({
      username: new FormControl("",[Validators.required,Validators.minLength(5)]),
      password: new FormControl("",[Validators.required,Validators.minLength(5)])
    })
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
      this.loginService.login(this.loginForm.getRawValue().username,this.loginForm.getRawValue().password).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['home']);
        },
        error=>{
          console.log("Login Failed Wrong Username or Password:",error)
        }
      );
    } else {
      console.log('There is a problem with the form');
    }
  }

  // validatorPassword(fc: FormControl) {
  //   const value = fc.value as string;
  //   const isInvalid = 'password' === value.trim().toLowerCase();
  //   return isInvalid ? { passwordError: 'Password is not a strong password'} : null;
  // }
}
