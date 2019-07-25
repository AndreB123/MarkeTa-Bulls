import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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

  insertPortfolio(portName){
    var name = localStorage.getItem("currentUser").split(":")[1].split("\"")[1];
    console.log(portName);
    console.log(name);
    const body = new HttpParams().append("Username", name).append("name", portName)
    return this.http.post<any>(`http://localhost:8080/pipelineTest/MarkeTa-Bulls/insertPortfolio`, body)
  }
}
