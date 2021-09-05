import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { content } from './shared/routes/content-routes';
import { ContentLayoutComponent } from './shared/layout/content-layout/content-layout.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuardService } from './auth-gaurd.service';
const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivateChild: [AuthGuardService],
    
    children: content,
  },
  {
    path: '',
    canLoad: [AuthGuardService],
    redirectTo: 'dashboard/default',
    pathMatch: 'full',
  },

  // {
  //   path: "**",
  //   redirectTo: "/dashboard/default",
  //   pathMatch: "full",
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
