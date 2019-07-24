import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortStocksComponent } from './port-stocks.component';

describe('PortStocksComponent', () => {
  let component: PortStocksComponent;
  let fixture: ComponentFixture<PortStocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortStocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
