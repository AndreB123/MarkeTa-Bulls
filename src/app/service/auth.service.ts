import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
      return this.http.post<any>(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/login`, { username: username, password: password })
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              if (user && user.token) {
                  // store user details and jwt token in local storage to keep user logged in between page 'refreshes'
                  localStorage.setItem('currentUser', JSON.stringify(user));
              }

              return user;
          }));
  }

  logout() {
      // remove user from local storage and ends session to log user out
      localStorage.removeItem('currentUser');
      this.http.post<any>(`/MarkeTa-Bulls/logout`,{});
  }
}