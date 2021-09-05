import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomMethods } from '../custom/custom-method';
import { IProduct } from '../interfaces/product.interface';

@Injectable({
  providedIn: "root",
})
export class ProductService {
  baseUrl = 'http://localhost:3000/Product';
  constructor(private httpClient: HttpClient) {}
  // Get All product
  gets(): Observable<IProduct[]> {
    return this.httpClient
      .get<IProduct[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return Single product
  get(id: number): Observable<IProduct> {
    return this.httpClient
      .get<IProduct>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New product
  add(product: IProduct): Observable<IProduct> {
    return this.httpClient
      .post<IProduct>(this.baseUrl, product, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 product
  update(product: IProduct): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${product.id}`, product, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 product
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
