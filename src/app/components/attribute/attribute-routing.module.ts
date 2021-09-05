import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'add-attribute/:id',
        component: AddAttributeComponent,
        data: {
          title: 'Modify Attribute',
          breadcrumb: 'Modify Attribute',
        },
      },
      {
        path: 'add-attribute',
        component: AddAttributeComponent,
        data: {
          title: 'Add Attribute',
          breadcrumb: 'Add Attribute',
        },
      },
      {
        path: 'attribute-list',
        component: AttributeListComponent,
        data: {
          title: 'Attribute List',
          breadcrumb: 'Attribute List',
        },
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttributeRoutingModule { }
