import {CartDetail} from "./cart-detail";
import {Contact} from "./contact";
import {Order} from "./order";

export interface Invoice {
  order:Order,
  cart:CartDetail,
  paymentMethod:String,
  amount:String,
  issueDate:String,
  dueDate:String,
  paid:Boolean,
  contact:Contact
}
