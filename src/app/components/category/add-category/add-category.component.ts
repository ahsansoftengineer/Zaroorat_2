import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomMethods } from 'src/app/shared/custom/custom-method';
import { ProductCategoryForm } from 'src/app/shared/forms/product-category-form';
import { IProductCategoryVariationType } from 'src/app/shared/interfaces/product-category-variation-type.interface';
import { IProductCategory } from 'src/app/shared/interfaces/product-category.interface';
import { ProductCategoryVariationTypeService } from 'src/app/shared/service/product-category-variation-type.service';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  providers: [ProductCategoryForm]
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private _service: ProductCategoryService,
    private _form: ProductCategoryForm,
    private productCategoryVariationTypeService: ProductCategoryVariationTypeService,
    private route: ActivatedRoute,
  ) {}

  form: FormGroup;
  productCategories: IProductCategory[];
  productCategory: IProductCategory;
  productCategoryVariationTypes: IProductCategoryVariationType[]
  errMessage: string = 'error Message to Display';
  editMode: boolean = false;
  isError: boolean = false;
  id: number = undefined;

  ngOnInit(): void {
    this.form = this._form.getForm();
    this.getAllCategoryVariationType();
    this.getAllProductCategory();
    this.isError = false;
    this.errMessage = 'Childs Product Category Data Reterived';
    this.getProductCategory();
  }
  getProductCategory() {
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
        console.log(this.id);
      }
    );
    if (!isNaN(id)) {
      this.editMode = true;

      this._service.get(id).subscribe(
        (prodCat: IProductCategory) => {
          this._form.mapModelValuesToForm(prodCat, this.form);
          this.productCategory = prodCat;
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
  getAllProductCategory() {
    let categoriess: IProductCategory[];
    this._service.gets().subscribe(
      (categories) => (categoriess = categories),
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.productCategories = categoriess.slice();
        // this.isError = false;
        // this.errMessage = 'Childs Product Category Data Reterived';
        this.productCategories =  CustomMethods.startProductCategory(this.productCategories)
      }
    );
  }
  getAllCategoryVariationType() {
    let variationTypes: IProductCategoryVariationType[];
    this.productCategoryVariationTypeService.gets().subscribe(
      (variationType) => (variationTypes = variationType),
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.productCategoryVariationTypes = variationTypes.slice();
        this.isError = false;
        this.errMessage = 'Childs Product Category Data Reterived';
      }
    );
  }
  modifyProductCategory(action: string) {
    this.productCategory = this._form.mapFormValuesToModel(
      this.form
    );
    let result: any;
    if (action === 'Add') {
      this.productCategory.id = null;
      result = this._service.add(
        this.productCategory
      );
    } else if (action === 'Update') {
      result = this._service.update(
        this.productCategory
      );
    } else if (action === 'Delete') {
      result = this._service.delete(
        this.productCategory.id
      );
    }
    result.subscribe(
      () => {
        this.errMessage =
          this.productCategory.category +  ' ' +
          action +
          ' under Category Id ' + 
          this.productCategory.pId + ' Successfully';
        this.isError = false;
        this.form.patchValue({
          category: ''
        })
        this.getAllProductCategory();
        // this.router.navigateByUrl('/products/physical/category-list')
      },
      (err) => {
        console.log(err);
        this.errMessage = this.productCategory.category + ' not ' + action + ' Saved';
        this.isError = true;
      }
    );
  }
  validate(control: string): boolean{
    return this.form.get(control).invalid && this.form.get(control).touched
  }
}
