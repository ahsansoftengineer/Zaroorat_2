import { IUser } from "./user.interface";

export interface IChat {
  id:number;
  userA:number; // Self
  userB:number; // Target User
  message: string; // Self
  date: Date;
}
