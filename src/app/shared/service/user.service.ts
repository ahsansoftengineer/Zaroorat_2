import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomMethods } from '../custom/custom-method';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = environment.serviceUrl + 'api/company/';
  constructor(private httpClient: HttpClient) {}

  handlerror(error) {
    let errormessage = '';
    if (error.error instanceof ErrorEvent) {
      errormessage = 'Error: ${error.error.message}';
    } else {
      errormessage = error.error;
    }
    return throwError(errormessage);
  }

  // Add New user
  getApprovalRequests(): Observable<any> {
    const apiURL = this.baseUrl + 'approval-requests';
    return this.httpClient.get(apiURL).pipe(catchError(this.handlerror));
  }

  getUsers(): Observable<any> {
    const apiURL = this.baseUrl;
    return this.httpClient.get(apiURL).pipe(catchError(this.handlerror));
  }

  // approveCompany(obj):Observable<any>{

  //   const apiURL =  this.baseUrl + 'approval-request';
  //   return this.httpClient.post(apiURL, obj)
  //   .pipe(catchError(this.handlerror));
  // }

  approveCompany(obj): Observable<any> {
    const apiURL =
      this.baseUrl + `${obj.companyId}/approval-request?status=${obj.status}`;
    return this.httpClient.post(apiURL, obj).pipe(catchError(this.handlerror));
  }

  // Get All users
  gets(): Observable<IUser[]> {
    return this.httpClient
      .get<IUser[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return Single User
  get(id: number): Observable<IUser> {
    return this.httpClient
      .get<IUser>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New user
  add(user: IUser): Observable<IUser> {
    return this.httpClient
      .post<IUser>(this.baseUrl, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 user
  update(user: IUser): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${user.id}`, user, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 user
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Auth Area
  logInUser(userName: string, password: string): Observable<IUser> {
    // console.log(this.baseUrl+ '?userName='+ userName + '&password='+ password);
    return this.httpClient
      .get<IUser>(`${this.baseUrl}?userName=${userName}&password=${password}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  forgetPassword(userName: string, emailAddress: string) {
    return this.httpClient
      .get<IUser>(`${this.baseUrl}?userName=${userName}&email=${emailAddress}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // After Forgetting Password User will be redirect to Change Password via Email Link
  changePassword(userName: string, newPassword: string) {
    return this.httpClient
      .get<IUser>(
        `${this.baseUrl}?userName=${userName}&newpassword=${newPassword}`
      )
      .pipe(catchError(CustomMethods.handleError));
  }
}
