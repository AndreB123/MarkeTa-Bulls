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
    this.displayStocks();
  }

  displayMarkets(){
    return this.iex.getAllMarkets().subscribe(
      data => {
        this.markets = data["marketSummaryResponse"]["result"];
        console.log(this.markets);
      },
      error => {
        error = "Couldn't retrieve stocks.";
        console.log(error);
      }
    )
  }

  displayStocks(){
    return this.iex.getStockBySymbol("cat,ibm").subscribe(
      data => {
        this.markets = data["quoteResponse"]["result"];
        console.log(this.markets);
      },
      error => {
        error = "Couldn't retrieve stocks.";
        console.log(error);
      }
    )
  }

}
