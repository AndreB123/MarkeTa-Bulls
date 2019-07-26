import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { headersToString } from 'selenium-webdriver/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../classes/user';

@Injectable()
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
     }

     public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  login(username: string, password: string) {
      console.log(username);
      console.log(password);
      const body = new HttpParams().append("Username", username).append("password", password)
      return this.http.post<any>(`http://52.53.255.68:8088/pipelineTest/MarkeTa-Bulls/login`, body)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              console.log(user);
              if (user) {
                  // store user details and jwt token in local storage to keep user logged in between page 'refreshes'
                  console.log(user['balance']);
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
              }

                return user;
            }));
    }

    logout() {
        // remove user from local storage and ends session to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}