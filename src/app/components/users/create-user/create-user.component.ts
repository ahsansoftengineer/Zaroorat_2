import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UserForm } from 'src/app/shared/forms/user-form';

import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  providers: [UserForm]
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;
  constructor(public userService: UserService, public form: UserForm) {
  }
  createPermissionForm() {
  }
  ngOnInit() {
    this.userForm = this.form.getForm();
  }
}
