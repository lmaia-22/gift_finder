import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Fabricplan } from '../../../models/mdf/fabricplan';
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

export class FabricplanService {

  Id: number;
  Description: string; 
  ProductId: number; 
  DateStart: Date; 

  fabricplan:string = 'http://localhost:44375/api/fabricplan/';
  private handleError: HandleError;

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('ProductService');
  }

  getfabricplans():Observable<Fabricplan[]>{
    //get todos os eventos
    return this.http.get<Fabricplan[]>(`${this.fabricplan}`, httpOptions);
  }

  getfabricplan(Id):Observable<Fabricplan>{
    //get todos os eventos
    return this.http.get<Fabricplan>(`${this.fabricplan}${Id}`, httpOptions);
  }
     /** POST: add a new product to the database */
  postFabricPlan (fabricplan: Fabricplan): Observable<Fabricplan> {
  return this.http.post<Fabricplan>(`${this.fabricplan}`, fabricplan, httpOptions)
    .pipe(
      catchError(this.handleError('PostFabricplan', fabricplan))
        );
  }
  
    //    /** PUT: update the hero on the server. Returns the updated hero upon success. */
    updateFabricPlan (Id, fabricplan: Fabricplan): Observable<Fabricplan> {
      return this.http.put<Fabricplan>(`${this.fabricplan}${Id}`, fabricplan, httpOptions)
        .pipe(
          catchError(this.handleError('updateFabricplan', fabricplan))
        );
    }
  
    /** DELETE: delete the product from the server */
    deleteFabricPlan (id: number): Observable<{}> {
      const url = `${this.fabricplan}${id}`; // DELETE api/product/2
      return this.http.delete(url, httpOptions)
        .pipe(
          catchError(this.handleError('deleteProduct '))
        );
    }
  
  
}
