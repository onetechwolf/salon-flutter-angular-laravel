/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { TestBed, async, inject } from '@angular/core/testing';

import { SetupAuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetupAuthGuard]
    });
  });

  it('should ...', inject([SetupAuthGuard], (guard: SetupAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
