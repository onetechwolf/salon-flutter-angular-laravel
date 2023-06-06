/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';
import * as moment from 'moment';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent extends FooterComponent {
  date: any = '';
  constructor(public util: UtilService) {
    super();
    this.date = moment().format('YYYY');
  }
}
