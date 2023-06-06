/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsDetailsComponent } from './blogs-details.component';

describe('BlogsDetailsComponent', () => {
  let component: BlogsDetailsComponent;
  let fixture: ComponentFixture<BlogsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogsDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BlogsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
