import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getPortfolios(){
    var name = localStorage.getItem("currentUser").split(":")[1].split("\"")[1];
    console.log(localStorage.getItem("currentUser").split(":")[1].split("\"")[1])
    return this.http.get(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/Portfolios?Username=` + name);
  }
}
