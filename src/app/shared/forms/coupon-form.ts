import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { ICoupon, IRestriction, IUsage } from '../interfaces/coupon.interface';

@Injectable()
export class CouponForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }
  getForm() {
    this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      // id: [''],
      id: [''],
      title: ['', Validators.compose([Validators.required])],
      couponCode: ['', Validators.compose([Validators.required])],
      startDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
      freeShipping: ['', Validators.compose([Validators.required])],
      quantity: ['', Validators.compose([Validators.required])],
      discountType: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      restriction: this.fb.group({
        product: ['', Validators.compose([Validators.required])],
        categoryId: ['', Validators.compose([Validators.required])],
        minimumSpend: ['', Validators.compose([Validators.required])],
        maximumSpend: ['', Validators.compose([Validators.required])],
      }),
      usage: this.fb.group({
        perLimit: ['', Validators.compose([Validators.required])],
        perCustomer: ['', Validators.compose([Validators.required])],
      }),
    }));
  }
  mapModelValuesToForm(coupon: ICoupon, form: FormGroup) {
    form.patchValue(coupon);
    form.markAsDirty();
    form.markAsTouched();
  }
  mapFormValuesToModel(form: FormGroup): ICoupon {
    return {
      id: form.value.id,
      title: form.value.title,
      couponCode: form.value.couponCode,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      freeShipping: form.value.freeShipping,
      quantity: form.value.quantity,
      discountType: form.value.discountType,
      status: form.value.status,
      restriction: form.value.restriction,
      usage: form.value.usage,
    };
  }
  // Setting ProductVariation to Product Form Group as per the Record
  setExistingRestriction(restriction: IRestriction): FormGroup {
    let formGroup = this.fb.group({
      product: restriction.product,
      categoryId: restriction.categoryId,
      minimumSpend: restriction.minimumSpend,
      maximumSpend: restriction.maximumSpend,
    });
    return formGroup;
  }
  // Setting ProductVariation to Product Form Group as per the Record
  setExistingUsage(usage: IUsage): FormGroup {
    let formGroup = this.fb.group({
      perCustomer: usage.perCustomer,
      perLimit: usage.perLimit,
    });
    return formGroup;
  }
}
