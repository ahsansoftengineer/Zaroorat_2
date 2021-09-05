import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CustomMethods } from "../custom/custom-method";
import { IProductCategoryVariationType } from "../interfaces/product-category-variation-type.interface";

@Injectable({
  providedIn: "root",
})
export class ProductCategoryVariationTypeService{
  baseUrl = "http://localhost:3000/ProductCategoryVariationType";
  constructor(private httpClient: HttpClient) {

  }
  gets(): Observable<IProductCategoryVariationType[]> {
    return this.httpClient
      .get<IProductCategoryVariationType[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  get(id: number): Observable<IProductCategoryVariationType> {
    return this.httpClient
      .get<IProductCategoryVariationType>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError))
  }
  getVariationType(ProductCategoryId: number): Observable<IProductCategoryVariationType> {
    return this.httpClient
      .get<IProductCategoryVariationType>(`${this.baseUrl}/${ProductCategoryId}`)
      .pipe(catchError(CustomMethods.handleError))
  }
  add(productCategoryVariationType: IProductCategoryVariationType): Observable<IProductCategoryVariationType> {
    return this.httpClient
      .post<IProductCategoryVariationType>(this.baseUrl, productCategoryVariationType, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  update(productCategoryVariationType: IProductCategoryVariationType): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${productCategoryVariationType.id}`, productCategoryVariationType, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
