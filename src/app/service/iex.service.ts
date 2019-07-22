import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IEXService {

  constructor(private http:HttpClient) { }

  getAllMarkets(){
    const headers = new HttpHeaders().set("X-RapidAPI-Key","9ffc382b64mshbce44974abff97fp1f7431jsn6c215e9afe90")
    .set("X-RapidAPI-Host","apidojo-yahoo-finance-v1.p.rapidapi.com");

    const body = new HttpParams().set("region", "US").set("lang", "en");

    return this.http.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-summary", {headers:headers, params:body});
  }

  getStockBySymbol(symbols){
    const headers = new HttpHeaders().set("X-RapidAPI-Key","9ffc382b64mshbce44974abff97fp1f7431jsn6c215e9afe90")
    .set("X-RapidAPI-Host","apidojo-yahoo-finance-v1.p.rapidapi.com");

    const body = new HttpParams().set("region", "US").set("lang", "en").set("symbols", symbols);

    return this.http.get("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-quotes", {headers:headers, params:body});
  }
}
