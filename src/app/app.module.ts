import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookAppointmentComponent } from './components/book-appointment/book-appointment.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ShopComponent } from './components/shop/shop.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingDetailComponent } from './components/shopping-detail/shopping-detail.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { ContactComponent } from './components/contact/contact.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterTopComponent } from './components/footer-top/footer-top.component';
import { FooterBottomComponent } from './components/footer-bottom/footer-bottom.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    BookAppointmentComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    ProfileComponent,
    ShopComponent,
    CartComponent,
    CheckOutComponent,
    InvoiceComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    ShoppingDetailComponent,
    ShoppingComponent,
    ContactComponent,
    HeaderComponent,
    FooterTopComponent,
    FooterBottomComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
