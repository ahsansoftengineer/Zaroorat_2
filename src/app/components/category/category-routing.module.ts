import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryListComponent } from './category-list/category-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // Product Category
      {
        path: 'add-category/:id',
        component: AddCategoryComponent,
        data: {
          title: 'Modify Product Category',
          breadcrumb: 'Modify Product Category',
        },
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
        data: {
          title: 'Add Product Category',
          breadcrumb: 'Add Product Category',
        },
      },
      {
        path: 'category-list',
        component: CategoryListComponent,
        data: {
          title: 'Product Category List',
          breadcrumb: 'Product Category List',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
