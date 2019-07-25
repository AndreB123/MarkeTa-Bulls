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
          //portfolios
          var port = document.createElement("div");
          port.setAttribute("id", "port" + portnum);

          port.setAttribute("class", "card bg-dark");

          var name = document.createElement("h3");
          name.setAttribute("class","display-4")
          port.setAttribute("id", "name");


          name.innerHTML = "Portfolio: " + o["name"];
          port.appendChild(name);

          port.innerHTML+="<br>"

          var balance = document.createElement("label");
          balance.setAttribute("id", "balance");
          balance.setAttribute("class", "port");
          balance.innerHTML = "Balance: $0";
          port.appendChild(balance);

          port.innerHTML+="<br>"

          var formDiv = document.createElement("div");
          formDiv.setAttribute("class","row");

          var formcol = document.createElement("div");
          formcol.setAttribute("class","col-4");
          
          formDiv.appendChild(formcol);
          

          var sellPort = document.createElement("input");
          sellPort.setAttribute("type", "submit");
          sellPort.setAttribute("class","form-group col-4");
          sellPort.value = "Sell Portfolio";
          formDiv.appendChild(sellPort);

          port.innerHTML += "<br>";

          port.appendChild(formDiv);

          this.stocks = data["stocks"][portnum]["port-"+portnum];
          console.log(this.stocks);

          //for each stock in a portfolio
          
          for(let s of this.stocks){

            this.iex.getStockBySymbol(s["symbol"]).subscribe(
              data2 => {
                

                let tmp = data2["quoteResponse"]["result"][0];
                let curworth = s["amount"] * s["purchaseprice"]
                let bal = s["amount"] * tmp["regularMarketPrice"] - curworth;
              
                var symbol = document.createElement("label");
                symbol.setAttribute("id", "symbol");
                symbol.setAttribute("class", "port");
                symbol.innerHTML ="Symbol: " + s["symbol"];
                port.appendChild(symbol);
    
                var amount = document.createElement("label");
                amount.setAttribute("id", "amount");
                amount.setAttribute("class", "port");
                amount.innerHTML ="Shares: " + s["amount"];
                port.appendChild(amount);
    
                var purchaseAmount = document.createElement("label");
                purchaseAmount.setAttribute("id", "purchaseAmount");
                purchaseAmount.setAttribute("class", "port");
                purchaseAmount.innerHTML = "Purchase Price Per Share: $" + s["purchaseprice"];
                port.appendChild(purchaseAmount);
    
    
                var costContainer = document.createElement("div");
                costContainer.setAttribute("id", "contain");
                costContainer.setAttribute("class", "port");
                costContainer.innerHTML= "Current worth: $" + bal;
                port.appendChild(costContainer);
                port.innerHTML+="<br>"

                count += bal;
                document.getElementById("balance").innerHTML = "Balance: $" + count;
                
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
                
              },

              error => {
                error = "Couldn't retrieve stocks.";
                console.log(error);
              }
            )
          }
          list.appendChild(port);
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
