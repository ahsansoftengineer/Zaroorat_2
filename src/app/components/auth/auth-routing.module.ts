import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountVerificationComponent } from './account-verification/account-verification.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    children: [
      // Product
      {
        path: '',
        redirectTo: "/auth/login",
        pathMatch: "full",
      },
      {
        path: 'login',
        component: LoginComponent,
        
      },
      // {
      //   path: 'register',
      //   component: RegisterComponent,
        
      // },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'emailverificationsuccess',
        component: AccountVerificationComponent,
      },
      // {
      //   path: 'forget-password',
      //   component: ForgetPasswordComponent,
      // },
      {
        path: '**',
        redirectTo: "/auth/login",
        pathMatch: "full",
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
