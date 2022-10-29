import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder} from "@angular/forms";
import {LoginService} from "../../services/login.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AlertService } from 'src/app/services/alert.service';
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = "";
  isLoggedIn = false

  constructor(private loginService:LoginService,private router:Router, private alertService: AlertService,private formBuilder:FormBuilder, private route: ActivatedRoute,private tokenStorageService:TokenStorageService) {
    this.loginForm = new FormGroup<any>({})
    // this.loginService.currentUser.subscribe(user => {
    //   if(user !== null) {
    //     this.router.navigate(['/'])
    //   }
    // })

  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("",[Validators.required,Validators.minLength(5)]),
      password: new FormControl("",[Validators.required,Validators.minLength(5)])
    })
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
    }
  }

  // convenience getter for easy access to form fields
  get formControls() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm.getRawValue());
      this.loginService.login(this.loginForm.getRawValue().username,this.loginForm.getRawValue().password).subscribe(
        data => {
          console.log(data);
          this.router.navigate([this.returnUrl]);
        },
        error=>{
          console.log("Login Failed Wrong Username or Password:",error)
          this.alertService.error(error);
          this.loading = false;
        }
      );
    } else {
      console.log('There is a problem with the form');
      this.alertService.error("Please fill all required fields");
      this.loading = false;
      return;
    }
  }

  // validatorPassword(fc: FormControl) {
  //   const value = fc.value as string;
  //   const isInvalid = 'password' === value.trim().toLowerCase();
  //   return isInvalid ? { passwordError: 'Password is not a strong password'} : null;
  // }
}
