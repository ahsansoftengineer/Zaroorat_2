import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomMethods } from 'src/app/shared/custom/custom-method';
import { UserForm } from 'src/app/shared/forms/user-form';
import { IProductCategory } from 'src/app/shared/interfaces/product-category.interface';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-create-vendors',
  templateUrl: './create-vendors.component.html',
  styleUrls: ['./create-vendors.component.scss'],
  providers: [UserForm]
})
export class CreateVendorsComponent implements OnInit {
  constructor(
    private _form: UserForm,
    private _service: UserService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productCategoryService: ProductCategoryService
  ) {}
  ngOnInit() {
    this.form = this._form.getForm();
    this.createPermissionForm();
    this.getAllProductCategory();
    this.get();
  }
  form: FormGroup;
  permissionForm: FormGroup;
  user: IUser;
  isError: boolean = false;
  errMessage: string = '';
  editMode: boolean = false;
  productCategories: IProductCategory[] = [];
  vendorExtendedCategories: IProductCategory[] = [];
  createPermissionForm() {
    this.permissionForm = this.formBuilder.group({});
  }
  changePassword(
    previousPassword: string,
    newPassword: string,
    confirmPassword: string
  ) {
    if (previousPassword == this.user.password) {
      if (newPassword === confirmPassword) {
        this.user.password = newPassword;
        this.modify('Update');
      } else {
        this.errMessage = 'New Password and Confirm Password not Match';
        this.isError = true;
      }
    } else {
      this.errMessage = 'Old Password Does not Match';
      this.isError = true;
    }
  }
  get() {
    let id: number;
    this.editMode = false;
    this.route.params.subscribe(
      (params: Params) => {
        id = +params['id'];
      },
      (error) => {
        this.errMessage = error;
      },
      () => {
        console.log(id);
      }
    );
    if (!isNaN(id)) {
      this.editMode = true;

      this._service.get(id).subscribe(
        (user: IUser) => {
          this._form.mapModelValuesToForm(user, this.form);
          this.user = user;
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.errMessage = 'Unable to display result of ID ' + id;
          this.form = this._form.getForm();
        },
        () => {
          this.isError = false;
          this.errMessage = 'Showing Result of ID ' + id;
        }
      );
    } else {
      this.editMode = false;
      this.errMessage = 'Id is not Valid';
    }
  }
  modify(action: string) {
    this.user = this._form.mapFormValuesToModel(this.form);
    let result: any;
    if (action === 'Add') {
      this.user.id = null;
      result = this._service.add(this.user);
    } else if (action === 'Update') {
      result = this._service.update(this.user);
    } else if (action === 'Delete') {
      result = this._service.delete(this.user.id);
    }
    result.subscribe(
      () => {
        this.errMessage = this.user.name + action;
        this.isError = false;
        // this.router.navigateByUrl('/vendors/list-vendors');
      },
      (err) => {
        console.log(err);
        this.errMessage = this.user.name + ' ' + action + ' not Successfully';
        this.isError = true;
      }
    );
  }
  validate(control: string): boolean {
    return this.form.get(control).invalid && this.form.get(control).touched;
  }
  getAllProductCategory() {
    this.productCategoryService.gets().subscribe(
      (categories) => {
        this.productCategories = categories
      },
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.isError = false;
        this.errMessage = 'Childs Product Category Data Reterived';
        this.initializeExtendedCategory();
        CustomMethods.startProductCategory(this.productCategories)

      }
    );
  }
  // This for Initializing the Checkboxes
  initializeExtendedCategory() {
    let vendorExtendedCategories: IProductCategory[] = []
    this.productCategories.forEach((cate) => {
      if (!cate.pId) {
        vendorExtendedCategories.push(cate);
      }
      // else if (
      //   vendorExtendedCategories.find(
      //     (x) => cate.pId === x.id && !x.pId
      //   )
      // ) {
      //   vendorExtendedCategories.push(cate);
      // }
    });
    return vendorExtendedCategories
  }
}
