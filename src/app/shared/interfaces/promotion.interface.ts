export interface IPromotion {
  id: number
  package: string
  packageType: string
  detail: string
  keywords:string[]
  duration: Date // 3Months, 6Months, 12Months
  presedence: number // 1,2,3,4...
  benefits: string //
}
