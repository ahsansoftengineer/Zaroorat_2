export interface IProductVariation {
  size:string; // Size, Configuration, Quantity, Packages
  price: number; // Price as per Size
  quantity: Number; // Availaible Items
  colors: {color: string}[]; // Colors Availaible as per Size
}
