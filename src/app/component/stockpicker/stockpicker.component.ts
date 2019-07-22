import { Component, OnInit } from '@angular/core';
import { IEXService } from 'src/app/service/iex.service';

@Component({
  selector: 'app-stockpicker',
  templateUrl: './stockpicker.component.html',
  styleUrls: ['./stockpicker.component.css']
})
export class StockpickerComponent implements OnInit {

  constructor(private iex:IEXService) { }

  private markets:any[];
  private stocks:any[];

  ngOnInit() {
    this.displayMarkets();
    //this.displayStocks();
    let btn = document.getElementById("SButton");
    btn.addEventListener("click", (e:Event) => this.displayStocks());
  }

  displayMarkets(){
    return this.iex.getAllMarkets().subscribe(
      data => {
        this.markets = data["marketSummaryResponse"]["result"];

        var m = document.getElementById("col-one")
        for(let o of this.markets){
          var contain =document.createElement("div");
          var n = document.createElement("h4");
          n.innerHTML = o["exchange"];
          contain.appendChild(n);

          var s = document.createElement("h5");
          s.innerHTML = "Status: ";
          s.innerHTML += o["marketState"];
          contain.appendChild(s);

          var c = document.createElement("h5");
          c.innerHTML = "Previous Close: ";
          c.innerHTML += o["regularMarketPreviousClose"]["fmt"];
          contain.appendChild(c);

          var p = document.createElement("h5");
          p.innerHTML = "Market Price: ";
          p.innerHTML += o["regularMarketPrice"]["fmt"];
          contain.appendChild(p);

          var precent = document.createElement("h5");
          precent.innerHTML = "Percent Change: ";
          precent.innerHTML += o["regularMarketChangePercent"]["fmt"];
          contain.appendChild(precent);

          var t = document.createElement("h5");
          t.innerHTML = "Time: ";
          t.innerHTML += o["regularMarketTime"]["fmt"];
          contain.appendChild(t);
          m.appendChild(contain);
        }
        document.getElementById("col-one").appendChild(m);
        console.log(this.markets);
        console.log(this.markets[0]["exchange"]);
      },
      error => {
        error = "Couldn't retrieve stocks.";
        console.log(error);
      }
    )
  }

  displayStocks(){
    return this.iex.getStockBySymbol((<HTMLInputElement>document.getElementById("Search")).value).subscribe(
      data => {
        this.stocks = data["quoteResponse"]["result"];
        var page = document.getElementById("stocks");
        console.log(this.stocks);
        page.innerHTML = "";
        for(let o of this.stocks){
          page.innerHTML += o["fullExchangeName"] + "<br>";
          page.innerHTML += o["symbol"]+ "<br>";
          page.innerHTML += o["longName"]+ "<br>";
          page.innerHTML +="Short Term Trend: " + o["pageViews"]["shortTermTrend"];
          page.innerHTML += " | Mid Term Trend: " + o["pageViews"]["midTermTrend"];
          page.innerHTML += " | Long Term Trend: " + o["pageViews"]["longTermTrend"] + "<br>";
          page.innerHTML += "Pre Market Change: " + o["preMarketChangePercent"] + "%<br>";
          page.innerHTML += "Pre Market Price: $" + o["preMarketPrice"] + "<br>";
          page.innerHTML += "Previous Close Market Price: $" + o["regularMarketPreviousClose"] + "<br>";
          page.innerHTML += "Market Price: $" + o["regularMarketPrice"] + "<br>";
          page.innerHTML += "Percent Change: " + o["regularMarketChangePercent"] + "%<br>";
          page.innerHTML += "Market Volume: " + o["regularMarketVolume"] + "<br>";
        }
      },
      error => {
        error = "Couldn't retrieve stocks.";
        console.log(error);
      }
    )
  }

}
