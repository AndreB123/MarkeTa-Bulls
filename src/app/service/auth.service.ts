import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';

@Injectable()
export class AuthService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        const body = new HttpParams().set("Username", "username").set("password", "password")
        const headers = new HttpHeaders().set("Access-Control-Allow-Origin", "*")
        return this.http.post<any>(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/login`, { headers: headers, body: body })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page 'refreshes'
                    localStorage.setItem('currentUser', JSON.stringify(user.username));
                    console.log(localStorage.getItem('currentUser'))
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage and ends session to log user out
        localStorage.removeItem('currentUser');
        this.http.post<any>(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/logout`, {});
    }
}