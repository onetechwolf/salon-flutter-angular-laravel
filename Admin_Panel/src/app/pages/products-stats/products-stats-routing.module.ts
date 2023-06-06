/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsStatsComponent } from './products-stats.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsStatsRoutingModule { }
