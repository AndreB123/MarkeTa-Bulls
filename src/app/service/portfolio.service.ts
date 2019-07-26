import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  constructor(private http: HttpClient) { }

  getPortfolios(){
    var name = localStorage.getItem("currentUser").split(":")[1].split("\"")[1];
    //console.log(localStorage.getItem("currentUser").split(":")[1].split("\"")[1])
    return this.http.get(`http://52.53.255.68:8088/pipelineTest/MarkeTa-Bulls/Portfolios?Username=` + name);
  }

  insertPortfolio(portName){
    var name = localStorage.getItem("currentUser").split(":")[1].split("\"")[1];
    console.log(portName);
    console.log(name);
    const body = new HttpParams().append("Username", name).append("name", portName)
    return this.http.post<any>(`http://52.53.255.68:8088/pipelineTest/MarkeTa-Bulls/insertPortfolio`, body)
  }

  sellPortfolio(portId){
    console.log(portId);
    const body = new HttpParams().append("portId", portId)
    return this.http.post<any>(`http://52.53.255.68:8088/pipelineTest/MarkeTa-Bulls/sellPortfolio`, body)
  }
}
