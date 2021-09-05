import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { CustomMethods } from "../custom/custom-method";
import { ITransaction } from "../interfaces/transaction.interface";

@Injectable({
  providedIn: "root",
})
export class TransactionService {
  baseUrl = "http://localhost:3000/Transaction";
  constructor(private httpClient: HttpClient) {}
  // Return Single Employee Transaction
  get(id: number): Observable<ITransaction> {
    return this.httpClient
      .get<ITransaction>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return User Transaction List
  // getMyTransactions(userId:number): Observable<ITransaction[]> {
  //   return this.httpClient
  //     .get<ITransaction[]>(`${this.baseUrl}/${userId}`)
  //     .pipe(catchError(CustomMethods.handleError));
  // }
  // Get All Transaction
  gets(): Observable<ITransaction[]> {
    return this.httpClient
      .get<ITransaction[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New Transaction
  add(Transaction: ITransaction): Observable<ITransaction> {
    return this.httpClient
      .post<ITransaction>(this.baseUrl, Transaction, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 Transaction
  update(Transaction: ITransaction): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${Transaction.orderId}`, Transaction, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 Transaction
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
