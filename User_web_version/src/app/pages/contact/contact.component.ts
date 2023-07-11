/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Bunitas Salon Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2022-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contact = {
    'First Name': '',
    'Contact Name': '',
    'Phone': '',
    'Email': '',
    'Subject': '',
    'Description': '',
    'zsWebFormCaptchaWord': '',
    xnQsjsdp: 'edbsnb5ff629e3bd4047b6a4fabe79eac8c16',
    xmIwtLD: 'edbsn2032bfc8e8e2c30d21b45d0db4685b43cb18eaae7bc800e27de8e549aa4db511',
    xJdfEaS: '',
    actionType: 'Q2FzZXM=',
    returnURL: 'https://bunitas.com'


    // status: '0',
    // date: moment().format('YYYY-MM-DD'),


  };

  captchaUrl: any = '';

  constructor(
    public util: UtilService,
    public api: ApiService
  ) {
    console.log('general', this.util.general);
  }

  ngOnInit(): void {
    this.getCaptchaCode();
  }

  getCaptchaCode() {
    this.api.getExternal('https://desk.zoho.eu/support/GenerateCaptcha?action=getNewCaptcha&_=' + new Date().getTime()).then((data: any) => {

      if (data) {
        this.captchaUrl = data.captchaUrl;
        this.contact.xJdfEaS = data.captchaDigest;
        console.log(this);
      } else {
        this.util.errorMessage(this.util.translate('captcha code error'));
      }
    }, error => {
      this.util.errorMessage(this.util.translate('captcha code error'));
      console.log('default settings by id', error);
    }).catch((error: any) => {
      this.util.errorMessage(this.util.translate('captcha code error'));
      console.log('default settings by id', error);
    });
  }

  submit() {
    console.log('contact', this.contact);
    if (this.contact['First Name'] == '' || !this.contact['Phone'] || this.contact['Email'] == ''
        || this.contact['Description'] == '' || this.contact['zsWebFormCaptchaWord'] == '') {
      this.util.errorMessage(this.util.translate('all fields are required'));
      return false;
    }

    const emailfilter = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailfilter.test(this.contact['Email'])) {
      this.util.errorMessage(this.util.translate('Please enter valid email'));
      return false;
    }

    this.util.start();
    this.api.postExternal('https://desk.zoho.eu/support/WebToCase', this.contact).then((data: any) => {  //v1/contacts/create
      this.util.stop();
      if (data && data.status && data.status == 200 && data.data) {
        const param = {
          id: data.data.id,
          mediaURL: this.api.mediaURL,
          subject: this.util.translate('New Mail Request Received'),
          thank_you_text: this.util.translate('You have received new mail'),
          header_text: this.util.translate('New Contact Details'),
          email: this.util.general.email,
          from_mail: this.contact['Email'],
          from_username: this.contact['First Name'],
          from_message: this.contact['Description'],
          to_respond: this.util.translate('We have received your request, we will respond on your issue soon')
        };
        console.log(param);
        this.api.post('v1/sendMailToAdmin', param).then((data: any) => {
          console.log(data);
        }, error => {
          console.log(error);
        });
        this.contact['Email'] = '';
        this.contact['First Name'] = '';
        this.contact['Description'] = '';
        if (data && data.status == 200) {
          this.success();
        } else {
          this.util.errorMessage(this.util.translate('Something went wrong'));
        }
      }
    }, error => {
      console.log(error);
      this.util.stop();
      this.util.errorMessage(this.util.translate('Something went wrong'));
    });
  }

  success() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: 'success',
      title: this.util.translate('message sent successfully')
    });
  }
}
