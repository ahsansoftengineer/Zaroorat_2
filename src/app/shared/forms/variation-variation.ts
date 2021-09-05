import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IVariationVariation } from '../interfaces/variation-variation.interface';

@Injectable()
export class VariationVariationForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  getForm(): FormGroup {
    // this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: [''],
      variations: ['', Validators.compose([Validators.required])],
    }));
  }
  mapModelValuesToForm(
    variationVariation: IVariationVariation,
    variationVariationForm: FormGroup
  ) {
    variationVariationForm.patchValue(variationVariation);
    // this.productCategoryForm.markAsDirty();
    // this.productCategoryForm.markAsTouched();
  }
  mapFormValuesToModel(variationVariationForm: FormGroup): IVariationVariation {
    return {
      id: variationVariationForm.value.id,
      variations: variationVariationForm.value.variations,
    };
  }
}
