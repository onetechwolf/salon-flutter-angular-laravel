/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Bunitas Salon Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2022-present initappz.
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import Swal from 'sweetalert2';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  lat: string=''; lng: string=''; address: string=''; placeId: string=''; treatmentCategory: string='';categoryId: string=''; categoryType: string='';
  zoom = 12; // example zoom level
  isDropdownOpen = false;
  GoogleAutocomplete;
  geocoder: any;
  salonList: any[] = [];
  iconUrl: any = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  places = [];
  autocompleteTreatmentItems: any = [];
  autocompleteLocationItems: any = [];
  selectedSort: any = "0";selectedSortTemp: any = "0";
  apiCalled: boolean = false;
  price: any = "";priceTemp: any = "";

  @ViewChild('searchFilterModal') public searchFilterModal: ModalDirective;

  constructor(
    public util: UtilService,
    public api: ApiService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
  ) {
    this.autocompleteLocationItems = [];
    this.geocoder = new google.maps.Geocoder();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit(): void {
    this.getParams();
    this.initSearch();
  }

  getParams() {
    this.treatmentCategory = this.activatedRouter.snapshot.queryParams['category'];
    this.categoryId = this.activatedRouter.snapshot.queryParams['category_id'];
    this.categoryType = this.activatedRouter.snapshot.queryParams['category_type'];
    this.address = this.activatedRouter.snapshot.queryParams['address'];
    this.placeId = this.activatedRouter.snapshot.queryParams['place_id'];
  }

  initSearch() {
    if (this.address == undefined || this.placeId == undefined) { // get current location when the location is not selected
      this.getCurrentAddress();
    } else {
      this.selectSearchLocationResult(this.placeId, this.address);
    }
  }

  getSalonData() {

    // window.history.pushState({}, "", "/new-url");

    this.util.start();
    this.apiCalled = false;
    this.places = [];
    this.salonList = [];
    const param = {
      "lat": this.lat,
      "lng": this.lng,
      "category_id": this.categoryId,
      "category_type": this.categoryType,
      "price": this.price,
      "sort": this.selectedSort,
    };
    this.api.post('v1/salon/search', param).then((data: any) => {
      this.apiCalled = true;
      this.util.stop();
      if (data && data.status == 200) {
        this.salonList = data.data;
        this.salonList.forEach(salon => {
          this.places.push({lat:salon.lat, lng:salon.lng, cover: salon.cover});
        });
      } else {
      }
    }, error => {
      this.apiCalled = true;
      console.log('Err', error);
    }).catch(error => {
      this.apiCalled = true;
      console.log('Err', error);
      this.util.stop();
    });
  }

  onSearchChangeTreatmentCategory(event) {
    this.autocompleteTreatmentItems = [];

    let query = this.treatmentCategory;
    this.util.categories.forEach(category => {
      if (category.name.includes(query)) {
        category.type = 0; // parent
        this.autocompleteTreatmentItems.push(category);
        category.types.forEach(type => {
          type.type = 1; // child
          this.autocompleteTreatmentItems.push(type);
        });
      }
    });
  }

  selectSearchTreatmentResult(item) {
    this.autocompleteTreatmentItems = [];
    this.treatmentCategory = item.name;
    this.categoryType = item.type;
    this.categoryId = item.id;
  }

  onSearchChangeLocation(event) {
    if (this.address == '') {
      this.autocompleteLocationItems = [];
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: this.address }, (predictions, status) => {
      console.log(predictions);
      if (predictions && predictions.length > 0) {
        this.autocompleteLocationItems = predictions;
        console.log(this.autocompleteLocationItems);
      }
    });
  }

  selectSearchLocationResult(placeId, address) {
    this.autocompleteLocationItems = [];
    this.address = address;
    this.geocoder.geocode({ placeId: placeId }, (results, status) => {
      if (status == 'OK' && results[0]) {
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
        this.getSalonData();
      }
    });
  }

  getAddress(lat, lng) {
    this.util.stop();
    const geocoder = new google.maps.Geocoder();
    const location = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'location': location }, (results, status) => {
      console.log(results);
      console.log('status', status);
      if (results && results.length) {
        this.lat = lat;
        this.address = results[0].formatted_address;
        this.lng = lng;
        this.getSalonData();
      }
    });
  }

  removeTreatmentCategorySearchKey() {
    this.treatmentCategory = '';
    this.autocompleteTreatmentItems = [];
    this.categoryId = '';
    this.categoryType = '';
  }

  removeLocationSearchKey() {
    this.address = '';
    this.autocompleteLocationItems = [];
    this.lat = '';
    this.lng = '';
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectOption(option) {
    this.selectOption = option;
    this.isDropdownOpen = false;
  }

  onMouseClick(infoWindow, gm) {
    if (gm.lastOpen != null) {
        gm.lastOpen.close();
    }

    gm.lastOpen = infoWindow;

    infoWindow.open();
  }

  onMouseOver(gmaker) {
    gmaker.iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  }

  locate() {
    if (this.address == undefined) {
      this.getCurrentAddress();
    } else {
      this.getSalonData();
    }
  }

  getCurrentAddress() {
    if (window.navigator && window.navigator.geolocation) {
      this.util.start();
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.getAddress(position.coords.latitude, position.coords.longitude);
        },
        error => {
          this.util.stop();
          switch (error.code) {
            case 1:
              console.log('Permission Denied');
              this.util.errorMessage(this.util.translate('Location Permission Denied'));
              break;
            case 2:
              console.log('Position Unavailable');
              this.util.errorMessage(this.util.translate('Position Unavailable'));
              break;
            case 3:
              console.log('Timeout');
              this.util.errorMessage(this.util.translate('Failed to fetch location'));
              break;
            default:
              console.log('defual');
          }
        }
      );
    };
  }

  onSalon(salonUID: String, name: String) {
    const routeName = name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();;
    this.router.navigate(['salons', salonUID, routeName]);
  }

  showFilterModal() {
    this.searchFilterModal.show();
  }

  clickFilter() {
    this.price = this.priceTemp;
    this.selectedSort = this.selectedSortTemp;
    this.getSalonData();
  }
}

