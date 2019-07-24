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
        var count = 0;
        for(let o of this.stocks){
          var results = document.createElement("form");
          results.setAttribute("id", "result" + count);
          results.setAttribute("method", "post");
          results.setAttribute("action", "http://localhost:8080/pipelineTest/MarkeTa-Bulls/stock/add");

          var exchangename = document.createElement("label");
          exchangename.setAttribute("id", "ename"+count);
          exchangename.innerHTML += o["fullExchangeName"];
          results.appendChild(exchangename);

          var symbol = document.createElement("label");
          symbol.setAttribute("id", "symbol"+count);
          symbol.innerHTML += o["symbol"];
          results.appendChild(symbol);
          var hSymbol = document.createElement("input");
          hSymbol.setAttribute("name", "symbol");
          hSymbol.setAttribute("type", "hidden");
          hSymbol.value = o["symbol"];

          var fullname = document.createElement("label");
          fullname.setAttribute("id", "fname"+count);
          fullname.innerHTML += o["longName"];
          results.appendChild(fullname);

          var trends = document.createElement("label");
          trends.setAttribute("id", "trends"+count);
          trends.innerHTML +="Short Term Trend: " + o["pageViews"]["shortTermTrend"];
          trends.innerHTML += " | Mid Term Trend: " + o["pageViews"]["midTermTrend"];
          trends.innerHTML += " | Long Term Trend: " + o["pageViews"]["longTermTrend"];
          results.appendChild(trends);

          var preMarketChange = document.createElement("label");
          preMarketChange.setAttribute("id", "preMarketChange"+count);
          preMarketChange.innerHTML += "Pre Market Change: " + o["preMarketChangePercent"] + "%";
          results.appendChild(preMarketChange);

          var preMarketPrice = document.createElement("label");
          preMarketPrice.setAttribute("id", "preMarketPrice"+count);
          preMarketPrice.innerHTML += "Pre Market Price: $" + o["preMarketPrice"];
          results.appendChild(preMarketPrice);

          var prevMarketClose = document.createElement("label");
          prevMarketClose.setAttribute("id", "preMarketClose"+count);
          prevMarketClose.innerHTML += "Previous Close Market Price: $" + o["regularMarketPreviousClose"];
          results.appendChild(prevMarketClose);
          
          var marketPrice = document.createElement("label");
          marketPrice.setAttribute("id", "marketPrice"+count);
          marketPrice.innerHTML += "Market Price: $" + o["regularMarketPrice"];
          results.appendChild(marketPrice);
          var hPrice = document.createElement("input");
          hPrice.setAttribute("name", "price");
          hPrice.setAttribute("type", "hidden");
          hPrice.value = o["price"];

          var percentChange = document.createElement("label");
          percentChange.setAttribute("id", "percentChange"+count);
          percentChange.innerHTML += "Percent Change: " + o["regularMarketChangePercent"] + "%";
          results.appendChild(percentChange);

          var volume = document.createElement("label");
          volume.setAttribute("id", "fname"+count);
          volume.innerHTML += "Market Volume: " + o["regularMarketVolume"];
          results.appendChild(volume);

          var add = document.createElement("input");
          add.setAttribute("type", "submit");
          add.value = "Buy Stock";
          results.appendChild(add);
          page.appendChild(results);
        }
      },
      error => {
        error = "Couldn't retrieve stocks.";
        console.log(error);
      }
    )
  }

}
