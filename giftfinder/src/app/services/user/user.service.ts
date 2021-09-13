import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  id:number;
  users:string = 'http://localhost:3000/users';
  private handleError: HandleError;
  role: string;


  constructor(private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) { 
      this.handleError = httpErrorHandler.createHandleError('UserService');
  }

   // get all
   getUsers():Observable<User[]>{
    //get todos os eventos
    return this.http.get<User[]>(`${this.users}`, httpOptions);
  }

  //get by id
  getUser(id):Observable<User>{
    //get todos os eventos
    return this.http.get<User>(`${this.users}/${id}`, httpOptions);
  }

   /** POST: add a new User to the database */
  postUser(user: User):Observable<User> {
  return this.http.post<User>(`${this.users}/signup`, user, httpOptions)
   .pipe(
     catchError(this.handleError('Postuser', user))
       );
  }

   /** PUT: update the hero on the server. Returns the updated hero upon success. */
updateUser (Id, user: User): Observable<User> {
 return this.http.put<User>(`${this.users}/${Id}`, user, httpOptions)
   .pipe(
     catchError(this.handleError('updateUser', user))
   );
}
}
