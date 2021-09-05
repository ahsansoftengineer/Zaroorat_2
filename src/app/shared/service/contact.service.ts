import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IContact } from '../interfaces/contact.interface';
import { CustomMethods } from '../custom/custom-method';

@Injectable({
  providedIn: "root",
})
export class ContactService{
  baseUrl = 'http://localhost:3000/contact';
  constructor(private httpClient: HttpClient) {}
  // Not in Use Return Employee List
  get(id:number): Observable<IContact[]> {
    return this.httpClient
      .get<IContact[]>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return All Contacts of Single Employees
  getContact(id: number): Observable<IContact> {
    return this.httpClient
      .get<IContact>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New Chat
  add(contact: IContact): Observable<IContact> {
    return this.httpClient
      .post<IContact>(this.baseUrl, contact, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 Contact
  update(contact: IContact): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${contact.id}`, contact, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete Contact
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
