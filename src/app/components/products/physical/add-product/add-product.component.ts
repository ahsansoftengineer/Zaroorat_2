import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormArray } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductForm } from 'src/app/shared/forms/product-form';
import { IProductCategory } from 'src/app/shared/interfaces/product-category.interface';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { IProductCategoryVariationType } from 'src/app/shared/interfaces/product-category-variation-type.interface';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductCategoryVariationTypeService } from 'src/app/shared/service/product-category-variation-type.service';
import { CustomMethods } from 'src/app/shared/custom/custom-method';
import { IVariationVariation } from 'src/app/shared/interfaces/variation-variation.interface';
import { VariationVariationService } from 'src/app/shared/service/variation-variation.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [ProductForm]
})
export class AddProductComponent implements OnInit {
  files: File[] = [];
  form: FormGroup;
  product: IProduct;
  productCategories: IProductCategory[];
  productCategoryVariationTypes: IProductCategoryVariationType[] = [];
  currentproductCategoryVariationTypes: IProductCategoryVariationType[] = [];
  allVariationVariations: IVariationVariation[] = [];
  currentVariationVariations: IVariationVariation = null;
  currentSizes: string[] = [];
  colorCounter = 0;
  ParentID = 0;
  editMode: boolean = false;
  errMessage: string = 'no errors';
  isError: boolean = false;
  colors = [
    {
      name: 'Red',
      hex: '#FF0000',
    },
    {
      name: 'Blue',
      hex: '#0000FF',
    },
    {
      name: 'Indigo',
      hex: '#4B0082',
    },
    {
      name: 'Purple',
      hex: '#800080',
    },
    {
      name: 'Pink',
      hex: '#FFC0CB',
    },
    {
      name: 'Black',
      hex: '#000000',
    },
    {
      name: 'White',
      hex: '#FFFFFF',
    },
    {
      name: 'Orange',
      hex: '#FFA500',
    },
  ];
  constructor(
    private _service: ProductService,
    private _form: ProductForm,
    private productCategoryService: ProductCategoryService,
    private productCategoryVariationTypeService: ProductCategoryVariationTypeService,
    private variationVariationService: VariationVariationService,
    private _route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllProductCategory();
    this.getAllCategoryVariationType();
    this.getAllVariationVariation();

    this.form = this._form.getForm();
    if (this._route.snapshot.params['id']) {
      const id = +this._route.snapshot.params['id'];
      this.form.value.id = id;
    }
    this.getProduct();
  }
  categoryChange(event: IProductCategory) {
    this.currentproductCategoryVariationTypes = [];
    event.variationTypeId.forEach((id) => {
      this.currentproductCategoryVariationTypes.push(
        this.productCategoryVariationTypes.find(result => {
          return result.id === id;
        })
      );
    });
  }
  variationChange(VariationType: IProductCategoryVariationType) {
    this.currentVariationVariations = this.allVariationVariations.find((x) => {
      return x.id === VariationType.variationVariationId
    })
    if(this.currentVariationVariations){
      this.currentSizes = this.currentVariationVariations.variations.split(',')
    }
  }
  get productVariations(): AbstractControl[] {
    return (this.form.get('productVariations') as FormArray).controls;
  }
  get productImages(): AbstractControl[] {
    return (this.form.get('images') as FormArray).controls;
  }
  async getAllProductCategory() {
    await this.productCategoryService.gets().subscribe(
      (categories) => {
        this.productCategories = categories;
      },
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.productCategories = CustomMethods.startProductCategory(
          this.productCategories
        );
        this.isError = false;
        this.errMessage = 'Childs Product Category Data Reterived';
      }
    );
  }
  async getAllCategoryVariationType() {
    await this.productCategoryVariationTypeService.gets().subscribe(
      (variationType) => {
        this.productCategoryVariationTypes = variationType.slice();
      },
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.isError = false;
        this.errMessage = 'Childs Product Category Data Reterived';
      }
    );
  }
  async getAllVariationVariation() {
    await this.variationVariationService.gets().subscribe(
      (variationVariations) => {
        this.allVariationVariations = variationVariations;
      },
      (err) => {
        this.isError = true;
        this.errMessage = err.message;
        console.log(this.errMessage);
      },
      () => {
        this.isError = false;
        this.errMessage = 'Childs Product Category Data Reterived';
      }
    );
  }
  getProduct() {
    let id: number;
    this.editMode = false;
    this._route.params.subscribe((params: Params) => {
      id = +params['id'];
    });
    if (!isNaN(id)) {
      this.editMode = true;
      this._service.get(id).subscribe(
        (product: IProduct) => {
          this._form.mapModelValuesToForm(product, this.form);
          this.product = product;
        },
        (err: any) => {
          console.log(err);
          this.isError = true;
          this.errMessage = 'Unable to display result of ID ' + id;
          // Resetting All Controls
          this.form = this._form.getForm();
          // this.resettingImages()
        },
        () => {
          // Dynamically Setting Nested Form Group and Form Array
          this.form.setControl(
            'productVariations',
            this._form.setExistingProductVariation(
              this.product.productVariations
            )
          );
          this.form.setControl(
            'images',
            this._form.setExistingProductImage(this.product.images)
          );
          this.isError = false;
          this.errMessage = 'Showing Result of ID ' + id;
        }
      );
    } else {
      this.editMode = false;
      this.errMessage = 'Id is not Valid';
    }
  }
  modifyProduct(action: string) {
    this.product = this._form.mapFormValuesToModel(this.form);
    console.log(this.product);
    let result: any;
    if (action === 'Add') {
      this.product.id = 0;
      result = this._service.add(this.product);
    } else if (action === 'Update') {
      result = this._service.update(this.product);
    } else if (action === 'Delete') {
      result = this._service.delete(this.product.id);
    }
    result.subscribe(
      () => {
        this.errMessage =
          this.product.productTitle + ' ' + action + ' Successffully';
        this.isError = false;
      },
      (err) => {
        console.log(err);
        this.errMessage =
          this.product.productTitle + ' not ' + action + ' Successfully';
        this.isError = true;
      }
    );
  }
  addProductVariation() {
    this._form.addProductVariation(this.form);
  }
  removeProductVariation(index: number) {
    const skillsFormArray = <FormArray>this.form.get('productVariations');
    skillsFormArray.removeAt(index);
    skillsFormArray.markAsDirty();
    skillsFormArray.markAsTouched();
  }
  addColor(productVariation: FormGroup) {
    this._form.addProductVariationColor(productVariation);
  }
  removeColor(productVariation: FormGroup) {
    this._form.removeProductVariationColor(productVariation);
    this.colorCounter--;
  }
  removeImage() {
    this._form.removeImage();
  }
  readUrl(event: any, imgView) {
    if (event.target.files.length === 0) return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      imgView.src = reader.result.toString();
      // imageControl.value = event.target.files[0].name
    };
    
  }
  validate(control: string): boolean {
    return this.form.get(control).invalid && this.form.get(control).touched;
  }
}
