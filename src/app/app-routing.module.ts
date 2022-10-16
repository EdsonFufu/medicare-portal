import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {BookAppointmentComponent} from "./components/book-appointment/book-appointment.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SignupComponent} from "./components/signup/signup.component";
import {ShoppingCartComponent} from "./components/shopping-cart/shopping-cart.component";
import {ShoppingDetailComponent} from "./components/shopping-detail/shopping-detail.component";
import {CheckOutComponent} from "./components/check-out/check-out.component";
import {ShoppingComponent} from "./components/shopping/shopping.component";
import {ContactComponent} from "./components/contact/contact.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'shopping', component: ShoppingComponent },
  { path: 'dashboard',component: HomeComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'shopping-detail', component: ShoppingDetailComponent },
  { path: 'checkout', component: CheckOutComponent },
  { path: 'login', component: LoginComponent },
  {path:'signup',component:SignupComponent},
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
