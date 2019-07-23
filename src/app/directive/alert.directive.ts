import {  OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from 'src/app/service/alert.service';


@Component({
  selector: 'alert',
  templateUrl: 'alert.directive.html'
})
export class AlertDirective {
  private subscription: Subscription;
  message: any;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
      this.subscription = this.alertService.getMessage().subscribe(message => { 
          this.message = message; 
      });
  }

  ngOnDestroy() {
      this.subscription.unsubscribe();
  }
}
