import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BaseForm } from './base-form';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserForm extends BaseForm {
  constructor(protected fb: FormBuilder) {
    super(fb);
    this.getForm();
  }

  getForm() {
    this.markAsSubmitted(false);
    return (this.form = this.fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.required])],
      businessName: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      gender: [''],
      email: ['', Validators.compose([Validators.required])],
      personalContact: ['', Validators.compose([Validators.required])],
      businessContact: ['', Validators.compose([Validators.required])],
      businessAddress: ['', Validators.compose([Validators.required])],
      businessCategory: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      cnic: ['', Validators.compose([Validators.required])],
      nTNNumber: [''],
      userType: [''],
      userStatus: [''],
      online: [''],
      userImage: [''],
      userBanner: [''],
      complain: [''],
      background: [''],
      sidebar: [''],
  
    }));
  }
  mapModelValuesToForm(user: IUser, userForm: FormGroup) {
    userForm.patchValue(user);
    userForm.markAsDirty();
    userForm.markAsTouched();
  }
  mapFormValuesToModel(userForm: FormGroup): IUser {
    return {
      // Required
      id: userForm.value.id,
      name: userForm.value.name,
      userName: userForm.value.userName,
      businessName: userForm.value.businessName,
      password: userForm.value.password,
      email: userForm.value.email,
      cnic: userForm.value.cnic,
      personalContact: userForm.value.personalContact,
      businessContact: userForm.value.businessContact,
      businessAddress: userForm.value.businessAddress,
      businessCategory: userForm.value.businessCategory,
      city: userForm.value.city,
      // Optional 
      gender: userForm.value.gender,
      nTNNumber: userForm.value.nTNNumber,
      userType: userForm.value.userType,
      userStatus: userForm.value.userStatus,
      online: userForm.value.online,
      userImage: userForm.value.userImage,
      userBanner: userForm.value.userBanner,
      complain: userForm.value.complain,
      background: userForm.value.background,
      sidebar: userForm.value.sidebar,
    };
  }
}
