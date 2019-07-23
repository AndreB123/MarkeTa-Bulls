import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
        return this.http.post(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/CreateUser`, user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.username, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }
}