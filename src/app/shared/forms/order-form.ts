import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IOrder } from '../interfaces/order.interface';

@Injectable()
export class OrderForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  get productOrders(): FormGroup {
    return this.fb.group({
      order: ['', Validators.compose([Validators.required])], // sm, md, lg, xl
    });
  }
  getForm() {
    this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: [''],
      productOrder:  this.fb.array([this.productOrders]),
      quantity:  ['', Validators.compose([Validators.required])],
      amount:  ['', Validators.compose([Validators.required])],
      orderStatus:  ['', Validators.compose([Validators.required])],
      orderedTo:  ['', Validators.compose([Validators.required])],
      orderedBy:  ['', Validators.compose([Validators.required])],
      orderDate:  ['', Validators.compose([Validators.required])],
      deliveryDate:  ['', Validators.compose([Validators.required])],
      address:  ['', Validators.compose([Validators.required])],
      reciver:  [''],
    }));
  }
  mapModelValuesToForm(model: IOrder, userForm: FormGroup) {
    userForm.patchValue(model);
    userForm.markAsDirty();
    userForm.markAsTouched();
  }
  mapFormValuesToModel(form: FormGroup): IOrder {
    return {
      id: form.value.id,
      productOrder: form.value.productOrder,
      quantity: form.value.quantity,
      amount: form.value.amount,
      orderStatus: form.value.orderStatus,
      orderedTo: form.value.orderedTo,
      orderedBy: form.value.orderedBy,
      orderDate: form.value.orderDate,
      deliveryDate: form.value.deliveryDate,
      address: form.value.address,
      reciver: form.value.reciver,
    };
  }
}
