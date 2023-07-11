/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Bunitas Salon Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2022-present initappz.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartnerRoutingModule } from './partner-routing.module';
import { PartnerComponent } from './partner.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SharedModule } from 'src/app/shared/shared.module';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { NgxTypedJsModule } from 'ngx-typed-js';


@NgModule({
  declarations: [
    PartnerComponent
  ],
  imports: [
    CommonModule,
    PartnerRoutingModule,
    MDBBootstrapModule.forRoot(),
    SharedModule,
    IvyCarouselModule,
    NgxTypedJsModule
  ]
})
export class PartnerModule { }
