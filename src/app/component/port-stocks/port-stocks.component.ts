import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-port-stocks',
  templateUrl: './port-stocks.component.html',
  styleUrls: ['./port-stocks.component.css']
})
export class PortStocksComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sellPortfolio(portId){
    console.log(portId);
    // return this.portfolio.sellPortfolio(portId).subscribe(
    //   data => {
    //   },
    //   error => {
    //     error = "Couldn't delete portfolio.";
    //     console.log(error);
    //   }
    // )
  }

}
