/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Ultimate Salon Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SendMailRoutingModule } from './send-mail-routing.module';
import { SendMailComponent } from './send-mail.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    SendMailComponent
  ],
  imports: [
    CommonModule,
    SendMailRoutingModule,
    FormsModule,
    NgxSpinnerModule,
    CKEditorModule
  ]
})
export class SendMailModule { }
