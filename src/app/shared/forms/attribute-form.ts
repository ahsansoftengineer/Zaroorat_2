import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IAttribute } from '../interfaces/attribute.interface';

@Injectable()
export class AttributeForm extends BaseForm {

  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  getForm(): FormGroup {
    // this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: ['', Validators.compose([Validators.required])],
      category_Name:['', Validators.compose([Validators.required])],
      unit: ['', Validators.compose([Validators.required])],
      value: ['', Validators.compose([Validators.required])],
    }));
  }
  mapModelValuesToForm(
    attribute: IAttribute,
    attributeForm: FormGroup
  ) {
    attributeForm.patchValue(attribute);
  }
  mapFormValuesToModel(AttributeForm: FormGroup): IAttribute {
    return {
      id: AttributeForm.value.id,
      category_Name: AttributeForm.value.category_Name,
      unit: AttributeForm.value.unit,
      value: AttributeForm.value.value,
    };
  }
}
