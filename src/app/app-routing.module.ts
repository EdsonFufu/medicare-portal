import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BookAppointmentComponent} from "./components/book-appointment/book-appointment.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SignupComponent} from "./components/signup/signup.component";
import {CheckOutComponent} from "./components/check-out/check-out.component";
import {ContactComponent} from "./components/contact/contact.component";
import {ProductComponent} from "./components/product/product.component";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartComponent} from "./components/cart/cart.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'dashboard',component: HomeComponent},
  { path: 'cart', component: CartComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup',component:SignupComponent},
  { path: 'contact', component: ContactComponent },
  { path: 'appointment', component: BookAppointmentComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
