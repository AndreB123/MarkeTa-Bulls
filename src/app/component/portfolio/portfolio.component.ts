import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { IEXService } from 'src/app/service/iex.service';

import { User } from 'src/app/classes/user';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  currentUser: User;
  users: User[] = [];
  portfolios:any[];
  stocks:any[];

  constructor(private portfolio:PortfolioService, private iex:IEXService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getPortfolios();
    console.log("hit");
  }

  getPortfolios(){
    return this.portfolio.getPortfolios().subscribe(
      data => {
        this.portfolios = data["portfolios"];
        console.log(this.portfolios);
        var list = document.getElementById("Port-list");

        var portnum = 0;
        var count = 0;
        for(let o of this.portfolios){
          var redirect = document.createElement("a");
          redirect.setAttribute("routerLink", "portfoliostocks");

          var port = document.createElement("div");
          port.setAttribute("id", "port");
          var name = document.createElement("label");
          port.setAttribute("id", "name");
          name.innerHTML = "Portfolio: " + o["name"];
          port.appendChild(name);
          var balance = document.createElement("label");
          balance.setAttribute("id", "balance");
          balance.innerHTML = "Balance: $0";
          port.appendChild(balance);
          var sellPort = document.createElement("input");
          sellPort.setAttribute("type", "submit");
          sellPort.value = "Sell Portfolio";
          port.appendChild(sellPort);
          port.innerHTML += "<br>";

          this.stocks = data["stocks"][portnum]["port-"+portnum];
          console.log(this.stocks);

          for(let s of this.stocks){
            var symbol = document.createElement("label");
            symbol.setAttribute("id", "symbol");
            symbol.innerHTML ="Symbol: " + s["symbol"];
            port.appendChild(symbol);
            var amount = document.createElement("label");
            amount.setAttribute("id", "amount");
            amount.innerHTML ="Shares: " + s["amount"];
            port.appendChild(amount);
            var purchaseAmount = document.createElement("label");
            purchaseAmount.setAttribute("id", "purchaseAmount");
            purchaseAmount.innerHTML = "Purchase Price Per Share: $" + s["purchaseprice"];
            port.appendChild(purchaseAmount);
            var currentBalance = document.createElement("label");
            currentBalance.setAttribute("id", "currentBalance");
            this.iex.getStockBySymbol(s["symbol"]).subscribe(
              data2 => {
                let tmp = data2["quoteResponse"]["result"][0];
                let bal = s["amount"] * tmp["regularMarketPrice"] - s["amount"] * s["purchaseprice"];
                currentBalance.innerHTML = "Current worth: " + bal;
                count += bal;
                document.getElementById("balance").innerHTML = "Balance: $" + count;
              },
              error => {
                error = "Couldn't retrieve stocks.";
                console.log(error);
              }
            )
            port.appendChild(currentBalance);
            var sellAmount = document.createElement("input");
            sellAmount.setAttribute("name", "sellAmount");
            sellAmount.setAttribute("type", "number");
            port.appendChild(sellAmount);
            var submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.value = "Sell";
            port.appendChild(submit);
          }
          redirect.appendChild(port);
          list.appendChild(redirect);
          portnum += 1;
        }
        console.log(data);
      },
      error => {
        error = "Couldn't retrieve portfolios.";
        console.log(error);
      }
    )
  }

}
