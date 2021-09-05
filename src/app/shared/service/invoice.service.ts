import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { CustomMethods } from "../custom/custom-method";
import { IInvoice } from "../interfaces/invoice.interface";

@Injectable({
  providedIn: "root",
})
export class InvoiceService {
  baseUrl = "http://localhost:3000/Invoice";
  constructor(private httpClient: HttpClient) {}
  // Return Single Invoice
  get(id: number): Observable<IInvoice> {
    return this.httpClient
      .get<IInvoice>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return Vendor Invocies
  // getMyInvoices(userId: number): Observable<IInvoice[]> {
  //   return this.httpClient
  //     .get<IInvoice[]>(`${this.baseUrl}/${userId}`)
  //     .pipe(catchError(CustomMethods.handleError));
  // }
  // Get All Invoices
  gets(): Observable<IInvoice[]> {
    return this.httpClient
      .get<IInvoice[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New Invoice
  add(Invoice: IInvoice): Observable<IInvoice> {
    return this.httpClient
      .post<IInvoice>(this.baseUrl, Invoice, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 Invoice
  update(Invoice: IInvoice): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${Invoice.no}`, Invoice, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 Invoice
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
