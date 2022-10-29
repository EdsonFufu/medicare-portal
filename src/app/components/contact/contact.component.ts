import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormControlName, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.contactForm = new FormGroup<any>({})
  }

  ngOnInit(): void {
    this.contactForm = this.formBuilder.group({
      name: new FormControl("",[Validators.required,Validators.minLength(5)]),
      email: new FormControl("",[Validators.required,Validators.minLength(5)]),
      mobile: new FormControl("",[Validators.required,Validators.minLength(5)]),
      subject: new FormControl("",[Validators.required,Validators.minLength(5)]),
      message: new FormControl("",[Validators.required,Validators.minLength(5)])
    })
  }

  sendMessage() {

  }
}
