export interface IInvoice {
  no:number;
  invoice:number;
  date:Date; 
  shipping: number; 
  amount: number;
  tax: number;
  total: number;
  status: string;
}
