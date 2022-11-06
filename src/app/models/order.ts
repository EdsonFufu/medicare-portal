import {User} from "./user";
import {CartDetail} from "./cart-detail";

export interface Order {
  user:User,
  cart:CartDetail,
  quantity:Number,
  total:Number,
  tax:Number,
  subTotal:Number,
  shipping:Number,
  grandTotal:Number,
  paid:Boolean
}
