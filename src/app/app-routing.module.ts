import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { Routes, RouterModule } from '@angular/router';
import { StockpickerComponent } from './component/stockpicker/stockpicker.component';
import { SettingComponent } from './component/setting/setting.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './service/authfilter';
import { RegisterComponent } from './component/register/register.component';
import { PortStocksComponent } from './component/port-stocks/port-stocks.component';

const routes: Routes = [{
  //nav bar
  component: PortfolioComponent,
  path: "portfolio", canActivate: [AuthGuard]},{
  component: StockpickerComponent,
  path: "stockpicker", canActivate: [AuthGuard]},{
  component: SettingComponent,
  path: "setting", canActivate: [AuthGuard]},{
  component:LoginComponent,
  path: "login"
},  
//everything else that isnt there
{ path: 'register', component: RegisterComponent },
{ path: '**', redirectTo: '' }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class AppRoutingModule { }
