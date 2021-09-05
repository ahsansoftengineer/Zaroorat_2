import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { CustomMethods } from "../custom/custom-method";
import { IOrder } from "../interfaces/order.interface";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  // public id: number;
  // public productOrder: number; // IProduct
  // public quantity: number;
  // public amount: number;
  // public orderStatus: string;
  // public orderedTo: number; // IUser
  // public orderedBy: number; // IUser
  // public orderDate: string;
  // public deliveryDate: string;
  // public address: string;
  // public reciver?: string;
  baseUrl = "http://localhost:3000/Order";
  constructor(private httpClient: HttpClient) {}
  // Get All order
  gets(): Observable<IOrder[]> {
    return this.httpClient
      .get<IOrder[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return Single order
  get(id: number): Observable<IOrder> {
    return this.httpClient
      .get<IOrder>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New order
  add(order: IOrder): Observable<IOrder> {
    return this.httpClient
      .post<IOrder>(this.baseUrl, order, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 order
  update(order: IOrder): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${order.id}`, order, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 order
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
