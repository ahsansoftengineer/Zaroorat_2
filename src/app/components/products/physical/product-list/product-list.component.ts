import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces/product.interface';
import { ProductService } from 'src/app/shared/service/product.service';
import { productDB } from 'src/app/shared/tables/product-list';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  constructor(private router: Router,
    private _service: ProductService) {
    this.product_list = productDB.product;
  }
  ngOnInit() {
    this.getProducts();
  }
  grid = true;
  product_list = [];
  products: IProduct[] = [];
  isError:boolean = true;
  errMessage: string = '';
  collectionSize: number;
  pageSize: number = 10;
  page: number = 1
  getProducts() {
    this._service.gets().subscribe(
      (products) => (this.products = products),
      (err) => {
        this.isError = true;
        this.errMessage = err;
      },
      () => {
        this.isError = false;
        this.collectionSize = this.products.length
        this.errMessage = 'Date Reterived Successfully';
      }
    );
    console.log(this.errMessage);
    
  }
  modified(id: number){
    this.router.navigate([`/products/physical/add-product/${id}`]);
  }
  changeView(val){  
    this.grid = val;
  }
}
