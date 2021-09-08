import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs/Observable";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor() { }

  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
    const token = localStorage.getItem('currentUser');
    //console.log(token);
    const updatedRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + token)
          .append('Access-Control-Allow-Origin', '*')
      }); 
    //logging the updated Parameters to browser's console
    console.log("Before making api call : ", updatedRequest);
    return next.handle(request).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }
}