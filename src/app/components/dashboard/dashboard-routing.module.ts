import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo:'dashboard',
        pathMatch:'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
          title: "Dashboard",
          breadcrumb: "Dashboard"
        }
      },
      {
        path: 'dashboard/default',
        component: DashboardComponent,
        data: {
          title: "Dashboard",
          breadcrumb: "Dashboard"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
