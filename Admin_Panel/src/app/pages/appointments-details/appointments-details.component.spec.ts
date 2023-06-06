/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsDetailsComponent } from './appointments-details.component';

describe('AppointmentsDetailsComponent', () => {
  let component: AppointmentsDetailsComponent;
  let fixture: ComponentFixture<AppointmentsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppointmentsDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AppointmentsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
