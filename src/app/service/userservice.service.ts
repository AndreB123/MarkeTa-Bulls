import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { User } from 'src/app/classes/user';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/`);
    }

    getByUsername(username: string) {
        return this.http.get(`/users/` + username);
    }

    register(user: User) {
        console.log(user);
        console.log(user.balance);
        const body = new HttpParams().append("Username", user.username).append("password", user.password).append("balance" , ""+user.balance)
        return this.http.post<any>(`http://52.53.255.68:8088/pipelineTest/MarkeTa-Bulls/CreateUser`, body);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.username, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

}