import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CustomMethods } from "../custom/custom-method";
import { IVariationVariation } from "../interfaces/variation-variation.interface";

@Injectable({
  providedIn: "root",
})
export class VariationVariationService{
  baseUrl = "http://localhost:3000/VariationVariation";
  constructor(private httpClient: HttpClient) {

  }
  gets(): Observable<IVariationVariation[]> {
    return this.httpClient
      .get<IVariationVariation[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  get(id: number): Observable<IVariationVariation> {
    return this.httpClient
      .get<IVariationVariation>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError))
  }
  getVariationType(productCategoryVariationTypeID: number): Observable<IVariationVariation> {
    return this.httpClient
      .get<IVariationVariation>(`${this.baseUrl}/${productCategoryVariationTypeID}`)
      .pipe(catchError(CustomMethods.handleError))
  }
  add(productCategoryVariationType: IVariationVariation): Observable<IVariationVariation> {
    return this.httpClient
      .post<IVariationVariation>(this.baseUrl, productCategoryVariationType, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  update(productCategoryVariationType: IVariationVariation): Observable<void> {
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
