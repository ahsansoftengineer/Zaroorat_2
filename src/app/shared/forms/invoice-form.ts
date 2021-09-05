import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IInvoice } from '../interfaces/invoice.interface';

@Injectable()
export class InvoiceForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  getForm() {
    this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      no:['', Validators.compose([Validators.required])],
      invoice:['', Validators.compose([Validators.required])],
      date:['', Validators.compose([Validators.required])], 
      shipping:['', Validators.compose([Validators.required])], 
      amount:['', Validators.compose([Validators.required])],
      tax:['', Validators.compose([Validators.required])],
      total:['', Validators.compose([Validators.required])],
      status:['', Validators.compose([Validators.required])],
    }));
  }
  mapModelValuesToForm(model: IInvoice, form: FormGroup) {
    form.patchValue(model);
    form.markAsDirty();
    form.markAsTouched();
  }
  mapFormValuesToModel(form: FormGroup): IInvoice {
    return {
      no: form.value.no,
      invoice: form.value.invoice,
      date: form.value.date,
      shipping: form.value.shipping,
      amount: form.value.amount,
      tax: form.value.tax,
      total: form.value.total,
      status: form.value.status,
    };
  }
}
