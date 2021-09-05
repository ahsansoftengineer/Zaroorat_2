import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGroupComponent } from './create-group/create-group.component';
import { ListGroupComponent } from './list-group/list-group.component';
import { ViewGroupComponent } from './view-group/view-group.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // Product
      {
        path: '',
        redirectTo: "/group/groups",
        pathMatch: "full",
      },
      {
        path: "create-group",
        component: CreateGroupComponent,
        data: {
          title: "Create Groups",
          breadcrumb: "Groups"
        },
      },
      {
        path: "groups",
        component: ListGroupComponent,
        data: {
          title: "Groups List",
          breadcrumb: "List"
        },
      },
      {
        path: "view-groups/:id",
        component: ViewGroupComponent,
        data: {
          title: "Groups View",
          breadcrumb: "View"
        },
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
