import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../../models/mdf/product';
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

export class ProductService {
  id:number;
  products:string = 'http://localhost:44375/api/product';
  private handleError: HandleError;

    constructor(private http: HttpClient,
      httpErrorHandler: HttpErrorHandler) { 
        this.handleError = httpErrorHandler.createHandleError('ProductService');
    }

    // get all
    getProducts():Observable<Product[]>{
      //get todos os eventos
      return this.http.get<Product[]>(`${this.products}`, httpOptions);
    }

    //get by id
    getProduct(Id):Observable<Product>{
      //get todos os eventos
      return this.http.get<Product>(`${this.products}/${Id}`, httpOptions);
    }

     /** POST: add a new product to the database */
    postProduct (product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.products}`, product, httpOptions)
      .pipe(
        catchError(this.handleError('Postproduct', product))
          );
    }

  //    /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateProduct (Id, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.products}/${Id}`, product, httpOptions)
      .pipe(
        catchError(this.handleError('updateProduct', product))
      );
  }

  /** DELETE: delete the product from the server */
  deleteProduct (id: number): Observable<{}> {
    const url = `${this.products}/${id}`; // DELETE api/product/2
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteProduct '))
      );
  }

    
}
