
import { HttpRequest, HttpHandler, HttpInterceptor, HTTP_INTERCEPTORS, HttpClient, HttpEvent } from "@angular/common/http";
import { Injector, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject, Observable, throwError } from "rxjs";
import { catchError, switchMap, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';
import { AuthService } from "../service/auth.service";


@Injectable()
export class OauthInterceptor implements HttpInterceptor {

    public refreshTokenInProgress = false;
    public tokenRefreshedSource = new Subject();
    public tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

    constructor(private injector: Injector, private router: Router, private http: HttpClient, private authService: AuthService,) { }

    addAuthHeader(request) {
    
        if (request.url.includes('auth') || request.url.includes('public') ) {
            return request;
        }

        const authHeader =  this.authService.getAuth();
        if (authHeader) {
            return request.clone({
                setHeaders: {
                    "Authorization": 'Bearer ' + authHeader,
                }
            });
        }
        return request;
    }

    // callRefreshToken() {
    //     const refreshToken = this.authService.getAuth().refreshToken;
    //     const jsonobject = {
    //         sessionrefreshtoken: refreshToken,
    //     };
        
    //     return this.http.post(environment.serviceUrl + 'auth/refresh-token', jsonobject);
    // }

    // refreshToken(): Observable<any> {
    //     if (this.refreshTokenInProgress) {
    //         return new Observable(observer => {
    //             this.tokenRefreshed$.subscribe(() => {
    //                 observer.next();
    //                 observer.complete();
    //             });
    //         });
    //     } else {
    //         this.refreshTokenInProgress = true;

    //         return this.callRefreshToken().pipe(
    //             tap((data: any) => {
    //                 // PreAngular.setSession(data);
    //                 this.refreshTokenInProgress = false;
    //                 this.tokenRefreshedSource.next();
    //             }),
    //             catchError((data: any) => {
    //                 this.refreshTokenInProgress = false;
    //                 this.logout();
    //                 return Observable.throw(null);
    //             }));
    //     }
    // }

    logout() {
        this.authService.clearAll();
        localStorage.clear();
        this.router.navigateByUrl('/auth/login')
        if (window.location.href.indexOf('/auth/login') == -1) {
            this.router.navigate(['/auth/login']);
        }
    }

    handleResponseError(error,request?, next?)  {
        // Business error
        if (error.status === 400) {
            // Show message
            // console.log(error.error);
            // if(error.error.status == '3005'){
              
            // }
        }
        // Invalid token error
        else if (error.status === 401) {
            // return this.refreshToken().pipe(
            //     switchMap(() => {
            //         request = this.addAuthHeader(request);
            //         return next.handle(request);
            //     }),
            //     catchError(e => {
            //         if (e.status !== 401) {
            //             return this.handleResponseError(e);
            //         } else {
            //             this.logout();      
            //         }
            //     }));
        }

        // Access denied error
        else if (error.status === 403) {
            // Show message
            // Logout
            this.router.navigateByUrl('403');
        }

        // Server error
        else if (error.status === 500) {
            // Show message
        }

        // Maintenance error
        else if (error.status === 503) {
            // Show message
            // Redirect to the maintenance page
            this.router.navigateByUrl('maintenance');
        }
        return throwError(error);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        // Handle request
        request =  this.addAuthHeader(request);

        // Handle response
        return next.handle(request).pipe(catchError(error => {
            return this.handleResponseError(error, request, next);
        }));
    }
}
