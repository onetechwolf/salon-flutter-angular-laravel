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

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    IvyCarouselModule,
    MDBBootstrapModule.forRoot(),
    NgxSkeletonLoaderModule
  ]
})
export class HomeModule { }
