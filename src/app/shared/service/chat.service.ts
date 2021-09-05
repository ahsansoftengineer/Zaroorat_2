import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { IChat } from "../interfaces/chat.interface";
import { CustomMethods } from "../custom/custom-method";

@Injectable({
  providedIn: "root",
})
export class ChatService {
  baseUrl = "http://localhost:3000/chat";
  constructor(private httpClient: HttpClient) {}
  // Return Single Employee Chat
  get(id: number): Observable<IChat> {
    return this.httpClient
      .get<IChat>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Return MyChats List
  getMyChats(userA: number, userB: number): Observable<IChat[]> {
    return this.httpClient
      .get<IChat[]>(`${this.baseUrl}/${userA & userB}`)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Get All Chats
  gets(): Observable<IChat[]> {
    return this.httpClient
      .get<IChat[]>(this.baseUrl)
      .pipe(catchError(CustomMethods.handleError));
  }
  // Add New Chat
  add(chat: IChat): Observable<IChat> {
    return this.httpClient
      .post<IChat>(this.baseUrl, chat, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Update 1 Chat
  update(chat: IChat): Observable<void> {
    return this.httpClient
      .put<void>(`${this.baseUrl}/${chat.id}`, chat, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
        }),
      })
      .pipe(catchError(CustomMethods.handleError));
  }
  // Delete 1 Chat
  delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(CustomMethods.handleError));
  }
}
