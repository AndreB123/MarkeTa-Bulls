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
  loading = false;
  submitted = false;
  returnUrl: string;
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

  onSubmit(){
    return this.portfolio.insertPortfolio((<HTMLInputElement>document.getElementById("portfolioName")).value).subscribe(
      data => {
        this.getPortfolios();
      },
      error => {
        error = "Couldn't insert portfolio.";
        console.log(error);
      }
    )
  }

  sell(amount){
    
  }

  getPortfolios(){
    return this.portfolio.getPortfolios().subscribe(
      data => {
        this.portfolios = data["portfolios"];
        console.log(this.portfolios);
        var list = document.getElementById("Port-list");
        list.innerHTML = "";

        var portnum = 0;
        var count = 0;
        for(let o of this.portfolios){
          var redirect = document.createElement("a");
          redirect.setAttribute("routerLink", "portfoliostocks");

          var port = document.createElement("div");
          port.setAttribute("id", "port" + portnum);
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

          var stockNum = 0;
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

            var costContainer = document.createElement("div");
            costContainer.setAttribute("id", "contain"+stockNum);
            port.appendChild(costContainer);
            this.iex.getStockBySymbol(s["symbol"]).subscribe(
              data2 => {
                let tmp = data2["quoteResponse"]["result"][stockNum];
                let bal = s["amount"] * tmp["regularMarketPrice"] - s["amount"] * s["purchaseprice"];
                currentBalance.innerHTML = "Current worth: " + bal;
                count += bal;
                document.getElementById("balance").innerHTML = "Balance: $" + count;
                document.getElementById("contain"+stockNum).appendChild(currentBalance);
              },
              error => {
                error = "Couldn't retrieve stocks.";
                console.log(error);
              }
            )
            var form = document.createElement("form");
            form.setAttribute("onsubmit", "sell(" + s["stockId"] + ")");
            var sellAmount = document.createElement("input");
            sellAmount.setAttribute("name", "sellAmount");
            sellAmount.setAttribute("type", "number");
            form.appendChild(sellAmount);
            var submit = document.createElement("input");
            submit.setAttribute("type", "submit");
            submit.value = "Sell";
            form.appendChild(submit);
            port.appendChild(form);
            port.innerHTML += "<br>";
            stockNum += 1;
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
