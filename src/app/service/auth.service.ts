import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
      console.log(username);
      console.log(password);
      const body = new HttpParams().append("Username", username).append("password", password)
      return this.http.post<any>(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/login`, body)
          .pipe(map(user => {
              // login successful if there's a jwt token in the response
              console.log(user);
              if (user) {
                  // store user details and jwt token in local storage to keep user logged in between page 'refreshes'
                  console.log(user);
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