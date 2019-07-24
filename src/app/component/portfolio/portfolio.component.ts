import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/service/portfolio.service';

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

  constructor(private portfolio:PortfolioService) {
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
        console.log(this.portfolios)
        var list = document.getElementById("Port-list");
        

        for(let o of this.portfolios){
          var port = document.createElement("div");
          port.setAttribute("id", "port");
          var name = document.createElement("label");
          port.setAttribute("id", "name");
          name.innerHTML = "Portfolio: " + o["name"];
          port.appendChild(name);
          var balance = document.createElement("label");
          balance.setAttribute("id", "balance");
          balance.innerHTML = "Balance: $" + o["initBalance"];
          port.appendChild(balance);

          list.appendChild(port);
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
