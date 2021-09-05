export interface ICoupon {
  id: number
  title: string
  couponCode:string
  startDate: Date
  endDate: Date
  freeShipping: boolean
  quantity: number
  discountType:string // Precent Fixed
  status: boolean 
  restriction: IRestriction
  usage: IUsage
}

export interface IRestriction {
 product: string
 categoryId: number
 minimumSpend:number // Amount
 maximumSpend:number // Amount
}

export interface IUsage {
  perLimit: number
  perCustomer: number
 }
 