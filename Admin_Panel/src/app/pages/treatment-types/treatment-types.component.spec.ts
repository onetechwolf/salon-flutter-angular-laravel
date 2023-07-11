/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentTypesComponent } from './treatment-types.component';

describe('TreatmentTypesComponent', () => {
  let component: TreatmentTypesComponent;
  let fixture: ComponentFixture<TreatmentTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TreatmentTypesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TreatmentTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
