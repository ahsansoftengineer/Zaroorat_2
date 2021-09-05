import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AddAttributeComponent } from './add-attribute/add-attribute.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [AddAttributeComponent, AttributeListComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AttributeRoutingModule
  ]
})
export class AttributeModule { }
