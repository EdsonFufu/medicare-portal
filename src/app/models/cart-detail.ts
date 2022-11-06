import {ProductDetail} from "./product-detail";

export interface CartDetail {
  _id:String
  sessionId:String
  quantity:Number
  total:Number
  user:String
  createdAt:String
  updatedAt:String
  items:[ProductDetail]
}
