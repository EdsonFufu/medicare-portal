import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public formGroup:FormGroup
  constructor(private loginService:LoginService, private router:Router) {
    this.formGroup = new FormGroup({
      first_name: new FormControl("",[Validators.required]),
      last_name: new FormControl("",[Validators.required]),
      email: new FormControl("",[Validators.required,Validators.email]),
      password: new FormControl("",[Validators.required,Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  signup() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.getRawValue());
      this.loginService.createAccount(this.formGroup.getRawValue()).subscribe((data)=>{
        console.log(data);
        this.router.navigate(['home'])
      },error => {
        console.log('There is a problem with the form');
      })
    } else {
      console.log('There is a problem with the form');
    }
  }
}
