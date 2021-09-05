import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
// cke editor
import { ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { GalleryModule } from '@ks89/angular-modal-gallery';

import { NgSelectModule } from '@ng-select/ng-select';

import 'hammerjs';
import 'mousetrap';

import { NgxDropzoneModule } from 'ngx-dropzone';
// Adding Rich TextBox Editor

import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';

import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [
    DigitalListComponent,
    DigitalAddComponent,
    ProductDetailComponent,
    AddProductComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    SharedModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NgbModule,
    GalleryModule.forRoot(),
    NgxDropzoneModule,
    CKEditorModule,
  ],
  providers: [
    NgbActiveModal,
  ],
})
export class ProductsModule {}
