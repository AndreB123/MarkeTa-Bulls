import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';
import { IEXService } from 'src/app/service/iex.service';

import { User } from 'src/app/classes/user';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})

export class PortfolioComponent implements OnInit {

  currentUser: User;
  portfolios: any[];
  stocks: any[];

  constructor(private portfolio: PortfolioService, private iex: IEXService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    this.getPortfolios();
  }

  onSubmit() {
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

  getPortfolios() {
    return this.portfolio.getPortfolios().subscribe(
      data => {
        this.portfolios = data["portfolios"];
        console.log(this.portfolios);
        var list = document.getElementById("Port-list");
        list.innerHTML = "";

        var portnum = 0;
        var count = 0;
        var balances = new Array();
        for (let o of this.portfolios) {
          //portfolios
          var trash = 0;
          var port = document.createElement("div");
          port.setAttribute("id", "port" + portnum);

          port.setAttribute("class", "card bg-dark");

          var name = document.createElement("h3");
          name.setAttribute("class", "display-4")
          port.setAttribute("id", "name");

          balances.push([o["id"], 0]);
          name.innerHTML = "Portfolio: " + o["name"];
          port.appendChild(name);

          port.innerHTML += "<br>"

          var balance = document.createElement("label");
          balance.setAttribute("id", "balance" + o["id"]);
          balance.setAttribute("class", "port");
          balance.innerHTML = "Net Gains: $0";
          port.appendChild(balance);


          var formDiv = document.createElement("div");
          formDiv.setAttribute("class", "row");

          var formcol = document.createElement("div");
          formcol.setAttribute("class", "col-4");

          formDiv.appendChild(formcol);


          port.appendChild(formDiv);

          this.stocks = data["stocks"][portnum]["port-" + portnum];
          console.log(this.stocks);

          //for each stock in a portfolio

          for (let s of this.stocks) {
            var stockNum = 0;
            var divider = document.createElement("div");
            divider.setAttribute("id", "div:" + s["symbol"]);
            port.appendChild(divider)
            this.iex.getStockBySymbol(s["symbol"]).subscribe(
              data2 => {

                let tmp = data2["quoteResponse"]["result"][0];
                let curworth = s["amount"] * s["purchaseprice"]
                let bal = s["amount"] * tmp["regularMarketPrice"] - curworth;

                var tmpDivider = document.getElementById("div:" + s["symbol"]);
                var symbol = document.createElement("label");
                symbol.setAttribute("id", "symbol");
                symbol.setAttribute("class", "port");
                symbol.innerHTML = "Symbol: " + s["symbol"];
                tmpDivider.appendChild(symbol);

                tmpDivider.innerHTML += "<br>";

                var amount = document.createElement("label");
                amount.setAttribute("id", "amount");
                amount.setAttribute("class", "port");
                amount.innerHTML = "Shares: " + s["amount"];
                tmpDivider.appendChild(amount);

                tmpDivider.innerHTML += "<br>";

                var purchaseAmount = document.createElement("label");
                purchaseAmount.setAttribute("id", "purchaseAmount");
                purchaseAmount.setAttribute("class", "port");
                purchaseAmount.innerHTML = "Purchase Price Per Share: $" + s["purchaseprice"];
                tmpDivider.appendChild(purchaseAmount);

                tmpDivider.innerHTML += "<br>";

                var costContainer = document.createElement("div");
                costContainer.setAttribute("id", "contain");
                costContainer.setAttribute("class", "port");
                costContainer.innerHTML = "Net Gains: $" + bal;
                tmpDivider.appendChild(costContainer);
                tmpDivider.innerHTML += "<br>"

                let found = 0;
                for (let i of balances) {
                  if (i[0] == s["portid"])
                    break;
                  found += 1;
                }
                balances[found][1] += bal;
                document.getElementById("balance" + s["portid"]).innerHTML = "Net Gains: $" + balances[found][1];

                var form = document.createElement("form");
                // form.setAttribute("onsubmit", "sell(" + s["stockId"] + ")");

                // var sellAmount = document.createElement("input");
                // sellAmount.setAttribute("name", "sellAmount");
                // sellAmount.setAttribute("type", "number");
                // form.appendChild(sellAmount);

                // var submit = document.createElement("input");
                // submit.setAttribute("type", "submit");
                // submit.value = "Sell";
                // form.appendChild(submit);
                // tmpDivider.appendChild(form);
                // tmpDivider.innerHTML += "<br>";
                // var form = document.createElement("form");
                form.setAttribute("method", "get");
                form.setAttribute("action", "http://localhost:8080/pipelineTest/MarkeTa-Bulls/updateStock");
                form.setAttribute("target", "['/portfolio']");

                var sellAmount = document.createElement("input");
                sellAmount.setAttribute("name", "sellAmount");
                sellAmount.setAttribute("type", "number");
                form.appendChild(sellAmount);

                var stockId = document.createElement("input")
                stockId.setAttribute("type", "hidden");
                stockId.setAttribute("name", "stockId");
                stockId.value = s["id"];
                form.appendChild(stockId);

                var overallBalance = document.createElement("input");
                overallBalance.setAttribute("id", "overallBalance")
                overallBalance.setAttribute("type", "hidden");
                overallBalance.setAttribute("name", "overallBalance");
                overallBalance.value = "" + bal;
                form.appendChild(overallBalance);

                var tmpname = localStorage.getItem("currentUser").split(":")[1].split("\"")[1];
                var username = document.createElement("input")
                username.setAttribute("type", "hidden");
                username.setAttribute("name", "username");
                username.value = tmpname;
                form.appendChild(username);

                var submit = document.createElement("input");
                submit.setAttribute("type", "submit");
                submit.value = "Sell";
                form.appendChild(submit);
                tmpDivider.appendChild(form);
                

              },

              error => {
                error = "Couldn't retrieve stocks.";
                console.log(error);
              }
            )
            stockNum += 1;
          }
          port.innerHTML += "<br>";
          list.appendChild(port);
          list.innerHTML += "<br>";
          list.innerHTML += "<br>";
          portnum += 1;
        }
      },

      error => {
        error = "Couldn't retrieve portfolios.";
        console.log(error);
      }
    )
  }

}

