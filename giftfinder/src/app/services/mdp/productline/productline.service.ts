import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductLine } from '../../../models/mdp/productline';
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

export class ProductLineService {

  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('ProductService');
  }
  
    productlines:string = 'http://localhost:44376/api/productionline';

    Id: number;
    private handleError: HandleError;

    // get all
    getProductLines():Observable<ProductLine[]>{
      //get todos os eventos
      return this.http.get<ProductLine[]>(`${this.productlines}`, httpOptions);
    }
    //get by id
    getProductLine(Id):Observable<ProductLine>{
      //get todos os eventos
    return this.http.get<ProductLine>(`${this.productlines}/${Id}`, httpOptions);
    }

    /** POST: add a new product to the database */
    postProductLine(productline: ProductLine): Observable<ProductLine> {
      return this.http.post<ProductLine>(`${this.productlines}`, productline, httpOptions)
        .pipe(
          catchError(this.handleError('PostProductLine', productline))
            );
      }
    
      //    /** PUT: update the hero on the server. Returns the updated hero upon success. */
      updateProductLine (Id:number, productline: ProductLine): Observable<ProductLine> {
        return this.http.put<ProductLine>(`${this.productlines}/${Id}`, productline, httpOptions)
          .pipe(
            catchError(this.handleError('updateProductLine', productline))
          );
      }
    
      /** DELETE: delete the product from the server */
      deleteProductLine (id: number): Observable<{}> {
        const url = `${this.productlines}/${id}`; // DELETE api/product/2
        return this.http.delete(url, httpOptions)
          .pipe(
            catchError(this.handleError('deleteProductLine'))
          );
      }
}
