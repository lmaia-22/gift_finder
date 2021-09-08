import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Machine } from '../../../models/mdp/machine';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { catchError } from 'rxjs/operators';

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

export class MachineService {

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('OperationService');
  }
  
    machines:string = 'http://localhost:44376/api/machine';

    private handleError: HandleError;

    // get all
    getMachines():Observable<Machine[]>{
      //get todos os eventos
      return this.http.get<Machine[]>(`${this.machines}`, httpOptions);
    }
    //get by id
    getMachine(Id):Observable<Machine>{
      //get todos os eventos
      return this.http.get<Machine>(`${this.machines}/${Id}`, httpOptions);
    }

    /** POST: add a new operation to the database */
    postMachine (machine: Machine): Observable<Machine> {
      return this.http.post<Machine>(`${this.machines}`, machine, httpOptions)
        .pipe(
          catchError(this.handleError('postMachine', machine))
            );
  }

    /** PUT: update the hero on the server. Returns the updated hero upon success. */
    updateMachine (Id:number, machine: Machine): Observable<Machine> {
      return this.http.put<Machine>(`${this.machines}/${Id}`, machine, httpOptions)
        .pipe(
          catchError(this.handleError('updateMachine', machine))
        );
    }

    /** DELETE: delete the operation from the server */
    deleteMachine(id: number): Observable<{}> {
    const url = `${this.machines}/${id}`; // DELETE api/machine/id
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteMachine '))
      );
    }
}
