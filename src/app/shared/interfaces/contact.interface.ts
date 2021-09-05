import { IProduct } from "./product.interface";
import { IUser } from "./user.interface";

export interface IContact {
  id:number;
  user: number // User
  contacts:number[]; // User[]
}
