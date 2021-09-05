import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { ProductListComponent } from './physical/product-list/product-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // Product
      {
        path: 'physical/add-product/:id',
        component: AddProductComponent,
        data: {
          title: 'Modify Product',
          breadcrumb: 'Modify Product',
        },
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: 'Add Products',
          breadcrumb: 'Add Product',
        },
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: 'Product List',
          breadcrumb: 'Product List',
        },
      },
      // Product Detail
      {
        path: 'physical/product-detail/:id',
        component: ProductDetailComponent,
        data: {
          title: 'Product Detail',
          breadcrumb: 'Product Detail',
        },
      },

      // Digital Services Products Groups
      {
        path: 'digital/digital-product-list',
        component: DigitalListComponent,
        data: {
          title: 'Product List',
          breadcrumb: 'Product List',
        },
      },
      {
        path: 'digital/digital-add-product',
        component: DigitalAddComponent,
        data: {
          title: 'Add Products',
          breadcrumb: 'Add Product',
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
