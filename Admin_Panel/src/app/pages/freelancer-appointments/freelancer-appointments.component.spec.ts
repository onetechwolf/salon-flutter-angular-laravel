/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerAppointmentsComponent } from './freelancer-appointments.component';

describe('FreelancerAppointmentsComponent', () => {
  let component: FreelancerAppointmentsComponent;
  let fixture: ComponentFixture<FreelancerAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerAppointmentsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FreelancerAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
