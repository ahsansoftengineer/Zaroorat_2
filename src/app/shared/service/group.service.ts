import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IProductCategory } from "../interfaces/product-category.interface";
import { CustomMethods } from "../custom/custom-method";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  baseUrl = environment.serviceUrl + 'api/v1/';
  constructor(private httpClient: HttpClient) {

  }

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


  getSuperCategories():Observable<any> {
    const apiURL = this.baseUrl + 'group';
    return this.httpClient.get(apiURL)  
    .pipe(catchError(this.handlerror));
  }

  //Get super categories for customer signup
  getCategories():Observable<any> {
    const apiURL = environment.serviceUrl +'public/api/v1/group';
    return this.httpClient.get(apiURL)  
    .pipe(catchError(this.handlerror));
  }

  saveGroup(obj): Observable<any> {
    const apiURL = this.baseUrl + 'group';
    return this.httpClient.post(apiURL, obj)  
    .pipe(catchError(this.handlerror));
  }

  getGroup(groupId):Observable<any>{
    const apiURL = this.baseUrl + `group/${groupId}`;
    return this.httpClient.get(apiURL)  
    .pipe(catchError(this.handlerror));
  }

  updateStatus(obj):Observable<any>{
    const apiURL = this.baseUrl + `group/${obj.groupId}/update-status?status=${obj.status}`;
    return this.httpClient.patch(apiURL,obj)  
    .pipe(catchError(this.handlerror));
  }

  
}
