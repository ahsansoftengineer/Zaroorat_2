import { Component, OnInit } from '@angular/core';
import { IProductCategory } from 'src/app/shared/interfaces/product-category.interface';
import { ProductCategoryService } from 'src/app/shared/service/product-category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  constructor(
    private _service: ProductCategoryService,
    private router: Router,
  ) {}
  result : string = ''
  ngOnInit() {
    this.refereshProductCategory();  
  }

  isError: boolean = false;
  errMessage: string = '';
  productCategories: IProductCategory[] = [];
  newProductCategories: IProductCategory[] = [];
  collectionSize: number = 10;
  pageSize: number = 10;
  page: number = 1
  refereshProductCategory() {
    this._service.gets().subscribe(
      (productCategories) => {
        this.productCategories = productCategories
        this.newProductCategories = this.productCategories.slice();
      },
      (err) => {
        console.log(err);
        this.isError = true;
        this.errMessage = err;
      },
      () => {
        this.isError = false;
        this.collectionSize = this.productCategories.length;
        this.errMessage = 'Date Reterived Successfully';
      }
    );
  }
  modified(id: number): void {
    this.router.navigate([`/category/add-category/${id}`]);
  }
}
