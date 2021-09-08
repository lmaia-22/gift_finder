import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

auth: string = 'http://localhost:3000/users/login';
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${this.auth}`, { email: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    let tokenInfo = this.getDecodedAccessToken(user.token);
                    //console.log(tokenInfo);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user.token));
                    localStorage.setItem('user', JSON.stringify(tokenInfo.userId));
                    localStorage.setItem('role', JSON.stringify(tokenInfo.role));
                    localStorage.setItem('actions', JSON.stringify(tokenInfo.actions));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('actions');
    }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }
}
