/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LogincheckComponent } from './logincheck.component';

describe('LogincheckComponent', () => {
  let component: LogincheckComponent;
  let fixture: ComponentFixture<LogincheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogincheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogincheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
