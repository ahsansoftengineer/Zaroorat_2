export interface CreditCard {
  id:number;
  user_id: number;
  creditCardNo:number; // (xxx-xxx-xxx-xxx)
  creditCardCode:number; // 123
  creditCardtype:string; //  (American Express (Amex), Discover, Mastercard, and Visa)
  bankAccountName: string; // (HBL, AHBL, UBL, Summit)
  bankAccountNo: string // (00-000-0000-00000)
  expireDate: Date // Month Year
  creditCardTitle:string // (Shahrukh Khan SRK)
  creditCardStatus: string // Valid, Invalid, Pending,
}
