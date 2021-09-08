import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeMachine } from '../../../models/mdp/typemachine';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';
import { Machine } from 'src/app/models/mdp/machine';

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

export class TypeMachineService {

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('OperationService');
  }
  
    typemachines:string = 'http://localhost:44376/api/typemachine/';

    Id: number;
    Description: string;
    private handleError: HandleError;
    operationsIds: Array<number>
    typemchines: TypeMachine;

   // get all
   getTypeMachines():Observable<TypeMachine[]>{
    //get todos os eventos
    return this.http.get<TypeMachine[]>(`${this.typemachines}`, httpOptions);
  }
  //get by id
  getTypeMachine(Id):Observable<TypeMachine>{
    //get do evento
    return this.http.get<TypeMachine>(`${this.typemachines}${Id}`, httpOptions);
  }
  // get machines of type
  getmachinesoftypemachine(Id:number):Observable<[]>{
    //get todos os eventos
    return this.http.get<[]>(`${this.typemachines}${Id}/machines`, httpOptions);
  }
  
  /** POST: add a new operation to the database */
  postTypeMachine (typemachines: TypeMachine): Observable<TypeMachine> {
    return this.http.post<TypeMachine>(`${this.typemachines}`, typemachines, httpOptions)
      .pipe(
        catchError(this.handleError('postTypeMachine', typemachines))
          );
    }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
    updateTypeMachine (Id, typemachine: TypeMachine): Observable<TypeMachine> {
      return this.http.put<TypeMachine>(`${this.typemachines}${Id}`, typemachine, httpOptions)
        .pipe(
          catchError(this.handleError('updateTypeMachine', typemachine))
        );
    }

/** DELETE: delete the operation from the server */
  deleteTypeMachine (id: number): Observable<{}> {
    const url = `${this.typemachines}${id}`; // DELETE api/operation/id
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteTypeMachine '))
      );
  }
}
