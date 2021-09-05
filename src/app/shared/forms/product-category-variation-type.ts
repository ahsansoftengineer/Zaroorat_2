import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IProductCategoryVariationType } from '../interfaces/product-category-variation-type.interface';

@Injectable()
export class ProductCategoryVariationTypeForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  getForm(): FormGroup {
    // this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: [''],
      variationType: ['', Validators.compose([Validators.required])],
      variationVariationId: ['', Validators.compose([Validators.required])],
    }));
  }
  mapModelValuesToForm(
    productCategoryVariationType: IProductCategoryVariationType,
    productCategoryForm: FormGroup
  ) {
    productCategoryForm.patchValue(productCategoryVariationType);
    // this.productCategoryForm.markAsDirty();
    // this.productCategoryForm.markAsTouched();
  }
  mapFormValuesToModel(productCategoryForm: FormGroup): IProductCategoryVariationType {
    return {
      id: productCategoryForm.value.id,
      variationType: productCategoryForm.value.variationType,
      variationVariationId: productCategoryForm.value.variationVariationId,
    };
  }
}