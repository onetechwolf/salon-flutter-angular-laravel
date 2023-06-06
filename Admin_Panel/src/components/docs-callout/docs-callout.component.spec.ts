
/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocsCalloutComponent } from './docs-callout.component';
import { CalloutModule } from '@coreui/angular';

describe('DocsCalloutComponent', () => {
  let component: DocsCalloutComponent;
  let fixture: ComponentFixture<DocsCalloutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocsCalloutComponent],
      imports: [CalloutModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DocsCalloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
