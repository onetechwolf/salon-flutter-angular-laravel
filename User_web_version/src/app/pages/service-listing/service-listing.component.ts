/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Bunitas Salon Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2022-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-service-listing',
  templateUrl: './service-listing.component.html',
  styleUrls: ['./service-listing.component.scss']
})
export class ServiceListingComponent implements OnInit {
  categoryList: any[] = [];
  subCategoryList: any[] = [];
  freelancerList: any[] = [];
  salon: any[] = [];
  cateID: any = '';
  cateName: any = '';
  subCateID: any = '';
  apiCalled: boolean = false;
  categoryCalled: boolean = false;
  subCategoryCalled: boolean = false;
  haveData: boolean;
  constructor(
    private router: Router,
    public util: UtilService,
    public api: ApiService,
    private route: ActivatedRoute) {
    this.cateID = this.route.snapshot.paramMap.get('id');
    this.cateName = this.route.snapshot.paramMap.get('name');
    this.haveData = true;
    this.getAllCategories();
    this.getSubAllCategories();
    this.getDataFromSubCategories(this.cateID, 0);
  }

  onCateId(cateID: any, name: any) {
    this.cateID = cateID;
    this.cateName = name;
    this.getSubAllCategories();
    this.getDataFromSubCategories(this.cateID, 0);
  }

  onSubCateId(cateID: any, name: any) {
    this.subCateID = cateID;
    this.cateName = name;
    this.getDataFromSubCategories(this.subCateID, 1);
  }

  onFreelancerDetail(freelancerId: any, name: any) {
    const routeName = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    this.router.navigate(['service', freelancerId, routeName]);
  }

  onSalon(salonUID: String, name: String) {
    const routeName = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    this.router.navigate(['salons', salonUID, routeName]);
  }

  getAllCategories() {
    this.categoryList = [];
    this.categoryCalled = false;
    this.api.get('v1/category/getAllCategories').then((data: any) => {
      console.log(data);
      this.categoryCalled = true;
      if (data && data.status == 200) {
        this.categoryList = data.data;
        const currentId = this.categoryList.filter(x => x.id == this.cateID);
        console.log(currentId);
        if (currentId && currentId.length > 0) {
          this.cateName = currentId[0].name;
        }
        console.log(this.categoryList);
      }
    }, error => {
      console.log('Error', error);
      this.categoryCalled = true;
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log('Err', error);
      this.categoryCalled = true;
      this.util.apiErrorHandler(error);
    });
  }

  getSubAllCategories() {
    this.subCategoryList = [];
    this.subCategoryCalled = false;
    this.api.get('v1/category_type/getAllCategories?parent_id='+this.cateID).then((data: any) => {
      this.subCategoryCalled = true;
      if (data && data.status == 200) {
        this.subCategoryList = data.data;
      }
    }, error => {
      console.log('Error', error);
      this.subCategoryCalled = true;
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log('Err', error);
      this.subCategoryCalled = true;
      this.util.apiErrorHandler(error);
    });
  }

  getDataFromSubCategories(cateId, type) {
    const param = {
      "lat": localStorage.getItem('lat'),
      "lng": localStorage.getItem('lng'),
      "id": cateId,
      "type": type
    };
    this.apiCalled = false;
    this.freelancerList = [];
    this.api.post('v1/salon/getDataFromCategoryWeb', param).then((data: any) => {
      this.apiCalled = true;
      console.log(data);
      if (data && data.status == 200) {
        this.haveData = true;
        this.freelancerList = data.individual;
        this.salon = data.salon;
        console.log(this.freelancerList);
      } else {
        this.haveData = false;
        this.freelancerList = [];
      }
    }, error => {
      console.log('Error', error);
      this.apiCalled = true;
      this.haveData = false;
      this.freelancerList = [];
      this.util.apiErrorHandler(error);
    }).catch(error => {
      console.log('Err', error);
      this.apiCalled = true;
      this.haveData = false;
      this.freelancerList = [];
      this.util.apiErrorHandler(error);
    });
  }

  ngOnInit(): void { }

}
