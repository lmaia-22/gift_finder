import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Order } from '../../../models/orders/order';
import { Rank } from '../../../models/orders/rank';
import { catchError } from 'rxjs/operators';
import { HttpErrorHandler, HandleError } from '../../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Authorization': 'Bearer '+JSON.parse(localStorage.getItem('currentUser'))
  })
} 


@Injectable({
  providedIn: 'root'
})

export class OrderService {

  id:number;
  orders:string = 'http://localhost:3000/orders';
  private handleError: HandleError;

    constructor(private http: HttpClient,
      httpErrorHandler: HttpErrorHandler) { 
        this.handleError = httpErrorHandler.createHandleError('OrderService');
    }

    // get all
    getOrders():Observable<Order[]>{
      //get todos os eventos
      return this.http.get<Order[]>(`${this.orders}`, httpOptions);
    }

    //get by user id
    getOrderbyUser(id):Observable<Order[]>{
      //get todos os eventos
      return this.http.get<Order[]>(`${this.orders}/user/${id}`, httpOptions);
    }

    getOrder(id):Observable<Order>{
      //get todos os eventos
      return this.http.get<Order>(`${this.orders}/${id}`, httpOptions);
    }

     /** POST: add a new Order to the database */
    postOrder (order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.orders}`, order, httpOptions)
      .pipe(
        catchError(this.handleError('Postorder', order))
          );
    }

  //    /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateOrder (Id, order: Order): Observable<Order> {
  //  if(this.user.role ="User") throw "You´re not allow to edit ";
  //else {
    return this.http.put<Order>(`${this.orders}/${Id}`, order, httpOptions)
      .pipe(
        catchError(this.handleError('updateOrder', order))
      );
  }
  //}

  updateOrderCancel (Id, order: Order): Observable<Order> {
  //  if(this.user.role ="User") throw "You´re not allow to cancel ";
  //else {
    return this.http.put<Order>(`${this.orders}/${Id}`, order, httpOptions)
      .pipe(
        catchError(this.handleError('updateOrder', order))
      );
  //}
  }

  /** DELETE: delete the product from the server */
  deleteOrder (id: number): Observable<{}> {
    const url = `${this.orders}/${id}`; // DELETE api/Order/2
    return this.http.delete(url, httpOptions)
      .pipe(
        catchError(this.handleError('deleteOrder '))
      );
  }

  /** GET: orders/mostorderedproducts */
  getmostorderesproducts():Observable<Rank[]>{
    //get todos os eventos
    return this.http.get<Rank[]>(`${this.orders}/mostorderedproducts`, httpOptions);
  }

  /** GET: orders/mostorderedproductsbyquantity */
  mostorderedproductsbyquantity():Observable<Rank[]>{
    //get todos os eventos
    return this.http.get<Rank[]>(`${this.orders}/mostorderedproductsbyquantity`, httpOptions);
  }

  /** GET: orders/leastproductiontimeproducts */
  leastproductiontimeproducts():Observable<Rank[]>{
    //get todos os eventos
    return this.http.get<Rank[]>(`${this.orders}/leastproductiontimeproducts`, httpOptions);
  }
}