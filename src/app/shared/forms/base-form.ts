import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
// import { SuperForm } from "angular-super-validator";
export class BaseForm {
  protected form: FormGroup;
  protected formSubmitted: boolean = false;

  constructor(protected fb: FormBuilder) {}

  markAsSubmitted(flag: boolean = true) {
    this.formSubmitted = flag;
  }

  isSubmitted() {
    return this.formSubmitted;
  }

  getErrors(field: string = null, form: AbstractControl = null) {
    if (form === null) {
      form = this.form;
    }
    if (field) {
      // return SuperForm.getAllErrors(form.get(field));
    }
    // return SuperForm.getAllErrors(form);
  }
}
