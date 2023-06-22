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
import { NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  lat: string=''; lng: string=''; address: string=''; treatment: string='';
  zoom = 12; // example zoom level
  isDropdownOpen = false;

  GoogleAutocomplete;
  geocoder: any;
  salonList: any[] = [];
  iconUrl: any = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';

  places = [];

  autocompleteTreatmentItems: any = [];
  autocompleteLocationItems: any = [];
  selectedSort: any = 1;
  apiCalled: boolean = false;

  constructor(
    public util: UtilService,
    public api: ApiService,
    private router: ActivatedRoute,
  ) {
    this.autocompleteLocationItems = [];
    this.geocoder = new google.maps.Geocoder();
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
  }

  ngOnInit(): void {
    this.initSearch();
  }

  initSearch() {
    const treatment = this.router.snapshot.params['treatment'];
    if (treatment != undefined) {
      this.treatment = treatment;
    }
    this.lat = this.router.snapshot.params['lat'];
    this.lng = this.router.snapshot.params['lng'];
    this.address = this.router.snapshot.params['address'];
    if (this.lat == undefined || this.lng == undefined || this.address == undefined) {
      this.getCurrentAddress();
    } else {
      this.getSalonData()
    }
  }

  getSalonData() {
    this.apiCalled = false;
    const param = { "lat": this.lat, "lng": this.lng };
    this.api.post('v1/salon/getHomeDataWeb', param).then((data: any) => {
      this.apiCalled = true;
      if (data && data.status == 200) {
        console.log(data);
        this.salonList = data.salon;
        this.salonList.forEach(salon => {
          this.places.push({lat:salon.salon_lat, lng:salon.salon_lng, cover: salon.cover});
          console.log(this.places);
        });
      } else {
      }
    }, error => {
      this.apiCalled = true;
      console.log('Err', error);
    }).catch(error => {
      this.apiCalled = true;
      console.log('Err', error);
    });
  }

  onSearchChangeTreatment(event) {
    if (this.treatment == '') {
      this.autocompleteTreatmentItems = [];
      return;
    }

    let query = this.treatment;
    this.autocompleteTreatmentItems = this.util.services.map(function(service) {
      if (service.name.includes(query)) {
        return service;
      }
    }).filter(function(item) {
      return item !== undefined;
    });
  }

  selectSearchTreatmentResult(item) {
    this.autocompleteTreatmentItems = [];
    this.treatment = item.name;
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

  selectSearchLocationResult(item) {
    console.log('select', item);
    localStorage.setItem('addsSelected', 'true');
    this.autocompleteLocationItems = [];
    this.address = item.description;
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status == 'OK' && results[0]) {
        console.log(status);
        this.lat = results[0].geometry.location.lat();
        this.lng = results[0].geometry.location.lng();
        this.address = item.description;
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
      }
    });
  }

  removeTreatmentSearchKey() {
    this.treatment = '';
    this.autocompleteTreatmentItems = [];
  }

  removeLocationSearchKey() {
    this.address = '';
    this.autocompleteLocationItems = [];
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
          this.getSalonData();
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
}

