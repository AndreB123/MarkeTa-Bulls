import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Stock } from './classes/stock';


@Injectable({
  providedIn: 'root'
})
export class StockserviceService {

  constructor(private http:HttpClient) { }

  insertStock(Stock:Stock){
    return this.http.post('http://localhost:8080/pipelineTest/MarkeTa-Bulls/insertStock', Stock);    
  }

  updateStock(Stock:Stock){
    return this.http.put('http://localhost:8080/pipelineTest/MarkeTa-Bulls/updateStock', Stock);
  }

  deleteStock(id: number, portId: number){
    return this.http.delete('http://localhost:8080/pipelineTest/MarkeTa-Bulls/removeStock');

  }

}
