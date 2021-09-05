import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IProductCategory } from '../interfaces/product-category.interface';

@Injectable()
export class ProductCategoryForm extends BaseForm {

  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  getForm(): FormGroup {
    // this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
      category: ['', Validators.compose([Validators.required])],
      variationTypeId:[''],
      pId: ['', Validators.compose([Validators.required])],
      // subCategory: this.fb.array([null]), // Only For Node
      metaTitle: ['', Validators.compose([Validators.required])],
      metaDescription: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
    }));
  }
  mapModelValuesToForm(
    productCategory: IProductCategory,
    productCategoryForm: FormGroup
  ) {
    productCategoryForm.patchValue(productCategory);
    // this.productCategoryForm.markAsDirty();
    // this.productCategoryForm.markAsTouched();
  }
  mapFormValuesToModel(productCategoryForm: FormGroup): IProductCategory {
    return {
      id: productCategoryForm.value.id,
      category: productCategoryForm.value.category,
      pId: productCategoryForm.value.pId,
      variationTypeId: productCategoryForm.value.variationTypeId,
      description: productCategoryForm.value.description,
      metaTitle: productCategoryForm.value.metaTitle,
      metaDescription: productCategoryForm.value.metaDescription,
    };
  }
}
