/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockpickerComponent } from './stockpicker.component';

describe('StockpickerComponent', () => {
  let component: StockpickerComponent;
  let fixture: ComponentFixture<StockpickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockpickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockpickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
