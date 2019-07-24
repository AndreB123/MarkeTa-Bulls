import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';;

import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './component/header/header.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { StockpickerComponent } from './component/stockpicker/stockpicker.component';
import { SettingComponent } from './component/setting/setting.component';
import { LoginComponent } from './component/login/login.component';

import bootstrap from "bootstrap";
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './service/authfilter';
import { AuthService } from './service/auth.service';
import { UserService } from './service/userservice.service';
import { JwtInterceptor  } from './service/jwtTokenCeck';
import { AlertDirective } from './directive/alert.directive';
import { AlertService} from './service/alert.service';
import { ErrorService } from './service/error.service';
import { PortStocksComponent } from './component/port-stocks/port-stocks.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeaderComponent,
    PortfolioComponent,
    StockpickerComponent,
    SettingComponent,
    LoginComponent,
    RegisterComponent,
    AlertDirective,
    PortStocksComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard,
    AuthService,
    UserService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorService, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
