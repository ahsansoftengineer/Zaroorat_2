import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { ITransaction } from '../interfaces/transaction.interface';

@Injectable()
export class TransactionForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }

  getForm() {
    this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: [''],
      orderId: ['', Validators.compose([Validators.required])],
      userId: ['', Validators.compose([Validators.required])],
      vendorId: ['', Validators.compose([Validators.required])],
      transactionId: ['', Validators.compose([Validators.required])],
      date: ['', Validators.compose([Validators.required])],
      payMethod: ['', Validators.compose([Validators.required])],
      deliveryStatus: ['', Validators.compose([Validators.required])],
      amount: ['', Validators.compose([Validators.required])],
    }));
  }
  mapModelValuesToForm(model: ITransaction, form: FormGroup) {
    form.patchValue(model);
    form.markAsDirty();
    form.markAsTouched();
  }
  mapFormValuesToModel(form: FormGroup): ITransaction {
    return {
      id: form.value.id,
      vendorId: form.value.vendorId,
      userId: form.value.userId,
      orderId: form.value.orderId,
      transactionId: form.value.transaction,
      date: form.value.date,
      payMethod: form.value.payMethod,
      deliveryStatus: form.value.deliveryStatus,
      amount: form.value.amount,
    };
  }
}
