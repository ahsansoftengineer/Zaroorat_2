import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { CustomMethods } from '../custom/custom-method';
import { IProduct } from '../interfaces/product.interface';
import { IProductVariation } from '../interfaces/product-variation.interface';

@Injectable()
export class ProductForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  // Generating Product Variation for Product FormGroup
  get productVariation(): FormGroup {
    return this.fb.group({
      size: [
        '0',
        Validators.compose([
          Validators.required,
          CustomMethods.selectValidator('0'),
        ]),
      ], // Size, Configuration, Quantity, Packages
      price: ['', Validators.compose([Validators.required])], // sm, md, lg, xl
      quantity: ['', Validators.compose([Validators.required])],
      colors: this.fb.array([this.productVariationColor]), // #fff, e3e3e3
      // colors:  ['', Validators.compose([Validators.required])], // #fff, e3e3e3
    });
  }
  // Generating Product Variation for Product FormGroup
  get productVariationColor(): FormGroup {
    return this.fb.group({
      color: [null, Validators.compose([Validators.required])],
      quantity: [1, Validators.compose([Validators.required])],
    });
  }
  // Generating Images for Product FormGroup
  get productImage(): FormGroup {
    return this.fb.group({ image: [''] });
  }
  getForm(): FormGroup {
    // this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      // General Info
      id: [''],
      productTitle: ['', Validators.compose([Validators.required])],
      productCategoryId: [
        '',
        Validators.compose([
          Validators.required,
          CustomMethods.selectValidator('0'),
        ]),
      ], // Product Category
      // userId: ['', Validators.compose([Validators.required])], // Vendor Name
      productVariations: this.fb.array([this.productVariation]),
      images: this.fb.array([
        this.productImage,
        this.productImage,
        this.productImage,
        this.productImage,
        this.productImage,
        this.productImage
      ]),

      // SEO
      metaTitle: [''],
      metaDescription: [''],

      // Rich Text Box Data
      shortDescription: ['', Validators.compose([Validators.required])],
      longDescription: [''],
    }));
  }
  // Adding Product Variation in Product FormGroup
  addProductVariation(productVariationForm: FormGroup) {
    (<FormArray>productVariationForm.get('productVariations')).push(
      this.productVariation
    );
  }
  // Adding Product Image in Product FormGroup
  addImage(productForm: FormGroup) {
    (<FormArray>productForm.get('images')).push(this.productImage);
  }
  // Removing the Last Image
  removeImage() {
    let imageFormArray = <FormArray>this.form.get('images');
    if (imageFormArray.length > 0) {
      imageFormArray.removeAt(imageFormArray.length - 1);
    }
  }
  // Adding Color in Product Variation for Product FormGroup
  addProductVariationColor(productVariationForm: FormGroup) {
    (<FormArray>productVariationForm.get('colors')).push(
      this.productVariationColor
    );
  }
  //Remove Color in Product Variation for Product FormGroup
  removeProductVariationColor(productVariationForm: FormGroup) {
    let colorFormArray = <FormArray>productVariationForm.get('colors');
    if (colorFormArray.length > 0) {
      colorFormArray.removeAt(colorFormArray.length - 1);
    }
  }
  mapModelValuesToForm(product: IProduct, productForm: FormGroup) {
    productForm.patchValue(product);
    productForm.markAsDirty();
    productForm.markAsTouched();
  }
  mapFormValuesToModel(productForm: FormGroup): IProduct {
    return {
      // General Info
      id: productForm.value.id,
      productTitle: productForm.value.productTitle,
      productCategoryId: productForm.value.productCategoryId,

      // Dynamically Adding Forms
      productVariations: productForm.value.productVariations,

      // Dynamically Adding Images
      images: productForm.value.images,

      metaTitle: productForm.value.metaTitle,
      metaDescription: productForm.value.metaDescription,

      // Rich Form Control like ReadMe.md
      shortDescription: productForm.value.shortDescription,
      longDescription: productForm.value.longDescription,
    };
  }
  // Setting ProductVariation to Product Form Group as per the Record
  setExistingProductVariation(
    productVariations: IProductVariation[]
  ): FormArray {
    let formArray = this.fb.array([]);
    productVariations.forEach((variation) => {
      formArray.push(
        this.fb.group({
          size: variation.size,
          price: variation.price,
          colors: this.setExistingProductVariationColors(variation.colors),
          quantity: variation.quantity,
        })
      );
    });
    // this.skillArray = formArray.controls
    return formArray;
  }
  // Setting ProductVariation to Product Form Group as per the Record
  setExistingProductImage(productImages: { image: string }[]): FormArray {
    let formArray = this.fb.array([]);
    productImages.forEach((image) => {
      formArray.push(
        this.fb.group({
          image: image.image,
        })
      );
    });
    return formArray;
  }
  // Setting Colors to ProductVariation of Product Form Group as per the Record
  setExistingProductVariationColors(colors: { color: string }[]): FormArray {
    let formArray = this.fb.array([]);
    colors.forEach((color) => {
      formArray.push(
        this.fb.group({
          color: color.color,
        })
      );
    });
    return formArray;
  }
}
