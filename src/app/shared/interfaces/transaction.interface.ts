export interface ITransaction {
  id:number
  orderId: number
  userId:number
  vendorId:number
  transactionId: string
  date: Date
  payMethod: string
  deliveryStatus: string
  amount: number
}
