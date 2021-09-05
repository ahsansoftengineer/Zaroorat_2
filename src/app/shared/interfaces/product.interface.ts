import { IProductVariation } from './product-variation.interface';

export interface IProduct {
  // General Info
  id: number;
  productTitle: string;
  productCategoryId?: number; // IProductCategory.id;

  // Dynamically Adding FormGroup
  productVariations?: IProductVariation[];


  imageCarousel?: any[];

  images?: { image: string }[];

  //SEO
  metaTitle?: string;
  metaDescription?: string;

  shortDescription?: string;
  longDescription?: string;
}
