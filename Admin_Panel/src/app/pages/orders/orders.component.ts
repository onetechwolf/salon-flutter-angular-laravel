/*
  Authors : cosonas (Rahul Jograna)
  Website : https://cosonas.com/
  App Name : Bunitas Management Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://cosonas.com/license
  Copyright and Good Faith Purchasers © 2022-present cosonas.
*/
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  dummy = Array(5);
  list: any[] = [];
  dummyList: any[] = [];
  page: number = 1;
  sort: any = [];
  itemsPerPage: number = 10;
  
  paymentName = [
    'NA',
    'COD',
    'Stripe',
    'PayPal',
    'Paytm',
    'Razorpay',
    'Instamojo',
    'Paystack',
    'Flutterwave'
  ];

  orderStatusNames = [
    this.util.translate('Created'), // 0
    this.util.translate('Accepted'), // 1
    this.util.translate('Rejected'), // 2
    this.util.translate('Ongoing'), // 3
    this.util.translate('Completed'), // 4
    this.util.translate('Cancelled by user'), // 5
    this.util.translate('Refund'), // 6
    this.util.translate('Delayed'), // 7
    this.util.translate('Pending Payments'), // 8
  ];
  constructor(
    public util: UtilService,
    public api: ApiService,
    private router: Router
  ) {
    this.getAll();
  }

  getAll() {
    this.list = [];
    this.dummy = Array(5);
    this.api.get_private('v1/product_order/getAllOrderAdmin').then((data: any) => {
      console.log(">>>>>", data);
      this.dummy = [];
      if (data && data.status && data.status == 200 && data.success) {
        if (data.data.length > 0) {
          data.data.forEach((element: any) => {
            if (((x) => { try { JSON.parse(x); return true; } catch (e) { return false } })(element.orders)) {
              element.orders = JSON.parse(element.orders);
            }
          });
          this.list = data.data;
          this.dummyList = data.data;
          console.log("====", this.list);
        }
      }
    }, error => {
      this.dummy = [];
      console.log('Error', error);
      this.util.apiErrorHandler(error);
    }).catch(error => {
      this.dummy = [];
      console.log('Err', error);
      this.util.apiErrorHandler(error);
    });
  }

  ngOnInit(): void {
  }

  viewData(id: any) {
    const param: NavigationExtras = {
      queryParams: {
        id: id
      }
    }
    this.router.navigate(['orders-details'], param);
  }

  sortOn(column: string) {
    this.sort[column] = (this.sort[column] == '' || this.sort[column] == 'desc') ? 'asc' : 'desc';
    this.sortByColumn(column, this.sort[column]);
  }

  sortByColumn(column:string, direction = 'desc'): any[] {
    let sortedArray = (this.list || []).sort((a,b)=>{
      if(a[column] > b[column]){
        return (direction === 'desc') ? 1 : -1;
      }
      if(a[column] < b[column]){
        return (direction === 'desc') ? -1 : 1;
      }
      return 0;
    })
    return sortedArray;
  }
}
