import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { CustomMethods } from "../custom/custom-method";
import { ICoupon } from "../interfaces/coupon.interface";

@Injectable({
  providedIn: "root",
})
export class CouponService {
  baseUrl = "http://localhost:3000/Coupon";
  constructor(private httpClient: HttpClient) {}
  // Return Single Coupon
  get(id: number): Observable<ICoupon> {
    return this.httpClient
      .get<ICoupon>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return User Coupons List
  // getMyCoupons(userId: number): Observable<ICoupon[]> {
  //   return this.httpClient
  //     .get<ICoupon[]>(`${this.baseUrl}/${userId}`)
  //     .pipe(catchError(CustomMethods.handleError));
  // }
  // Get All Coupons
  gets(): Observable<ICoupon[]> {
    return this.httpClient
      .get<ICoupon[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New Coupon
  add(Coupon: ICoupon): Observable<ICoupon> {
    return this.httpClient
      .post<ICoupon>(this.baseUrl, Coupon, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 Coupon
  update(Coupon: ICoupon): Observable<void> {
    debugger
    return this.httpClient
      .put<void>(`${this.baseUrl}/${Coupon.id}`, Coupon, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 Coupon
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
