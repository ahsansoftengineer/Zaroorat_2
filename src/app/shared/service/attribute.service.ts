import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CustomMethods } from '../custom/custom-method';
import { IAttribute } from '../interfaces/attribute.interface';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {
  baseUrl = "http://localhost:3000/Attribute";
  constructor(private httpClient: HttpClient) {

  }
  gets(): Observable<IAttribute[]> {
    return this.httpClient
      .get<IAttribute[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  get(id: number): Observable<IAttribute> {
    return this.httpClient
      .get<IAttribute>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError))
  }
  add(attribute: IAttribute): Observable<IAttribute> {
    return this.httpClient
      .post<IAttribute>(this.baseUrl, attribute, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  update(attribute: IAttribute): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${attribute.id}`, attribute, {
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
