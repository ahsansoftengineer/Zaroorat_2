export interface IProductCategory{
  id?:number
  category: string
  pId?:number
  variationTypeId?:number[]
  subCategory?:IProductCategory[]
  description?: string
  metaTitle?: string
  metaDescription?:string
}
