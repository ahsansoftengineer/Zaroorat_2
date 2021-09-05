import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { IProductCategory } from "../interfaces/product-category.interface";
import { CustomMethods } from "../custom/custom-method";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})

export class ProductCategoryService{
  baseUrl = environment.serviceUrl + 'api/v1/category';
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


  //Get Categories
  getCategories():Observable<any>{
      const apiURL = this.baseUrl;
      return this.httpClient.get(apiURL)  
      .pipe(catchError(this.handlerror));
  }
  
  // Get All productCategorys
  gets(): Observable<IProductCategory[]> {
    return this.httpClient
      .get<IProductCategory[]>( 'http://localhost:3000/ProductCategory')
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return Single productCategory
  get(id: number): Observable<IProductCategory> {
    return this.httpClient
      .get<IProductCategory>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError))
  }
  // Add New productCategory
  add(productCategory: IProductCategory): Observable<IProductCategory> {
    return this.httpClient
      .post<IProductCategory>(this.baseUrl, productCategory, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 productCategory
  update(productCategory: IProductCategory): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${productCategory.id}`, productCategory, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 productCategory
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
