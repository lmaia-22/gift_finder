import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Operation } from '../../../models/mdp/operation';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'   
  })
} 

@Injectable({
  providedIn: 'root'
})

export class OperationService {

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('OperationService');
  }
  
    operations:string = 'http://localhost:44376/api/operation/';

    Id: number;
    Description: string;
    private handleError: HandleError;

    // get all
    getOperations():Observable<Operation[]>{
      //get todos os eventos
      return this.http.get<Operation[]>(`${this.operations}`, httpOptions);
    }
    //get by id
    getOperation(Id):Observable<Operation>{
      //get do evento
      return this.http.get<Operation>(`${this.operations}${Id}`, httpOptions);
    }

      /** POST: add a new operation to the database */
      postOperation (operation: Operation): Observable<Operation> {
        return this.http.post<Operation>(`${this.operations}`, operation, httpOptions)
          .pipe(
            catchError(this.handleError('postOperation', operation))
              );
        }

    /** PUT: update the hero on the server. Returns the updated hero upon success. */
      updateOperation (Id, operation: Operation): Observable<Operation> {
        return this.http.put<Operation>(`${this.operations}${Id}`, operation, httpOptions)
          .pipe(
            catchError(this.handleError('updateOperation', operation))
          );
      }

  /** DELETE: delete the operation from the server */
    deleteOperation (id: number): Observable<{}> {
      const url = `${this.operations}${id}`; // DELETE api/operation/id
      return this.http.delete(url, httpOptions)
        .pipe(
          catchError(this.handleError('deleteOperation '))
        );
    }
}
