import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user.interface';
import { CustomMethods } from '../custom/custom-method';
import { IAuth } from '../interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  companyUrl = environment.serviceUrl +'public/api/v1/auth/';
  adminUrl = environment.serviceUrl+'public/api/v1/admin/auth/'
  constructor(private httpClient: HttpClient,  private router: Router) {}
  
  handlerror(error) {
    let errormessage = '';
    if (error.error instanceof ErrorEvent) {
      errormessage = 'Error: ${error.error.message}';
    }
    else {
      errormessage = error.error;
    }
    return throwError(errormessage);
  }

  //store auth tokens
   setSession(auth: any) {
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    localStorage.setItem("auth", JSON.stringify(auth.token));        
    localStorage.setItem("refreshToken", JSON.stringify(auth.refreshToken));        
    localStorage.setItem("role", JSON.stringify(auth.roles[0]));        

  }

  clearAll() {
    localStorage.setItem("isLoggedIn", JSON.stringify(false));
    localStorage.setItem("auth", JSON.stringify({}));
    // localStorage.setItem("userInfo", JSON.stringify({}));
  }

  logout() {

    const apiURL =  environment.serviceUrl + 'api/user/logout';
    return this.httpClient.get(apiURL)  
    .pipe(catchError(this.handlerror));
    // this.clearAll();
    // localStorage.clear();
    // this.router.navigateByUrl('/auth/login');
  }

  isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem("isLoggedIn"));
  }


  //get auth tokens
   getAuth(): any {
    return JSON.parse(localStorage.getItem("auth"));
  }


  
  // Get All Chats
  signIn(): Observable<IAuth[]> {
    return this.httpClient
      .get<IAuth[]>(this.companyUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return Single User
  getUser(userName: string, password: string): Observable<IUser> {
    return this.httpClient
      .get<IUser>(
        `${this.companyUrl}/${{ userName: userName, password: password }}`
      )
      .pipe(catchError(CustomMethods.handleError));
  }

    // Add New user
    registerCompany(user): Observable<any> {
      const apiURL = this.companyUrl + 'company-signup';
      return this.httpClient.post(apiURL, user)  
      .pipe(catchError(this.handlerror));
    }

    // login user
    loginCompany(user): Observable<any> {
      const apiURL = this.companyUrl + 'company-login';
      return this.httpClient.post(apiURL, user)  
      .pipe(catchError(this.handlerror));
    }

    // login Admin
    loginAdmin(user): Observable<any> {
      const apiURL = this.adminUrl + 'login';
      return this.httpClient.post(apiURL, user)  
      .pipe(catchError(this.handlerror));
    }

    verifyAdminOTP(user): Observable<any> {
      const apiURL = this.adminUrl + 'verify-login-otp';
      return this.httpClient.post(apiURL, user)  
      .pipe(catchError(this.handlerror));
    }


    // verify company otp
    verifyOTP(obj): Observable<any> {
      const apiURL = this.companyUrl + 'verify-company-account';
      return this.httpClient.post(apiURL, obj)  
      .pipe(catchError(this.handlerror));
    }

    // verify company otp
    resendOTP(obj): Observable<any> {
      const apiURL = this.companyUrl + 'resend-company-signup-otp';
      return this.httpClient.post(apiURL, obj)  
      .pipe(catchError(this.handlerror));
    }

    sendForgotPasswordOTP(obj):Observable <any>{
      const apiURL = this.companyUrl + 'forgot-password' ;
      return this.httpClient.post(apiURL, obj)  
      .pipe(catchError(this.handlerror));
    }

    verifyForgotPasswordOTP(obj):Observable <any>{
      const apiURL =  this.companyUrl + 'verify-forgot-password-otp';
      return this.httpClient.post(apiURL, obj)  
      .pipe(catchError(this.handlerror));
    }

    newPasswordRequest(obj):Observable<any>{
      const apiURL =  this.companyUrl + 'change-password';
      return this.httpClient.post(apiURL, obj)  
      .pipe(catchError(this.handlerror));
    }


}
