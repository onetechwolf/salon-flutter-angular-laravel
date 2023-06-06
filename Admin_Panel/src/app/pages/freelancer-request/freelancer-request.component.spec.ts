/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreelancerRequestComponent } from './freelancer-request.component';

describe('FreelancerRequestComponent', () => {
  let component: FreelancerRequestComponent;
  let fixture: ComponentFixture<FreelancerRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreelancerRequestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FreelancerRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
