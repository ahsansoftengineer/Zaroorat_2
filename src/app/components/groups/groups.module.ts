import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupRoutingModule } from './group-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListGroupComponent } from './list-group/list-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';
@NgModule({
  declarations: [CreateGroupComponent, ListGroupComponent, ViewGroupComponent],
  imports: [
    CommonModule,
    GroupRoutingModule,
    SharedModule
  ]
})
export class GroupsModule { }
