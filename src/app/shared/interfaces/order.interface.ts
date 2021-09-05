import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";
import { ORDER_STATUS_ENUM } from '../enums/order-status.enums'
export interface IOrder {
  id: number;
  productOrder: {order: number}[]; // IProduct
  quantity: number;
  amount: number;
  orderStatus: string;
  orderedTo: number; // IUser
  orderedBy: number; // IUser
  orderDate: string;
  deliveryDate: string;
  address: string;
  reciver?: string;
}
