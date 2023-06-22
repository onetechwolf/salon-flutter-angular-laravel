/*
  Authors : initappz (Rahul Jograna)
  Website : https://initappz.com/
  App Name : Bunitas Salon Full App Flutter
  This App Template Source code is licensed as per the
  terms found in the Website https://initappz.com/license
  Copyright and Good Faith Purchasers © 2022-present initappz.
*/
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as moment from 'moment';
import { ApiService } from 'src/app/services/api.service';
import { UtilService } from 'src/app/services/util.service';
import { AppComponent } from 'src/app/app.component';
declare var google: any;


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  autocomplete1: { 'query_treatment': string, 'query_location': string };
  autocompleteTreatmentItems: any = [];
  autocompleteLocationItems: any = [];
  GoogleAutocomplete;
  selectedLat: any;
  selectedLng: any;
  selectedAddress: any;
  selectedTreatment: any;
  geocoder: any;

  blogs: any;
  constructor(
    private router: Router,
    public util: UtilService,
    public api: ApiService,
    public appComponent: AppComponent,
  ) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder();
    this.autocomplete1 = { query_treatment: '', query_location: '' };
    this.autocompleteLocationItems = [];
    this.getBlogs();
  }

  ngOnInit(): void {
  }

  goToRest() {
    this.util.publishModalPopup('location');
  }

  getBlogs() {
    this.api.get('v1/blogs/getTop').then((data: any) => {
      console.log(data);
      if (data && data.status == 200) {
        this.blogs = data.data;
      }
    }, error => {
      console.log(error);
      this.util.errorMessage(this.util.translate('something went wrong'));
    }).catch((error: any) => {
      console.log(error);
      this.util.errorMessage(this.util.translate('something went wrong'));
    });
  }

  goToBlogs(item) {
    console.log(item);
    const param: NavigationExtras = {
      queryParams: {
        id: item.id,
        title: item.title.replace(/\s+/g, '-').toLowerCase()
      }
    }
    this.router.navigate(['/blog-detail'], param);
  }
  locate() {
    const param: NavigationExtras = {
      queryParams: {
        treatment: this.selectedTreatment,
        lat: this.selectedLat,
        lng: this.selectedLng,
        address: this.selectedAddress,
      }
    }
    this.router.navigate(['search'], param);
  }

  onSearchChangeTreatment(event) {
    console.log(event);
    if (this.autocomplete1.query_treatment == '') {
      this.autocompleteTreatmentItems = [];
      return;
    }
    // const addsSelected = localStorage.getItem('treatment');
    // if (addsSelected && addsSelected != null) {
    //   localStorage.removeItem('treatmentSelected');
    //   return;
    // }

    let query = this.autocomplete1.query_treatment;
    this.autocompleteTreatmentItems = this.util.services.map(function(service) {
      if (service.name.includes(query)) {
        return service;
      }
    }).filter(function(item) {
      return item !== undefined;
    });
  }

  selectSearchTreatmentResult(item) {
    console.log('select', item);
    this.autocompleteTreatmentItems = [];
    this.autocomplete1.query_treatment = item.name;
    this.selectedTreatment = item.id;
    localStorage.setItem('treatmentSelected', 'true');
    localStorage.setItem('treatment', 'item.name');
  }

  onSearchChangeLocation(event) {
    console.log(event);
    if (this.autocomplete1.query_location == '') {
      this.autocompleteLocationItems = [];
      return;
    }
    const addsSelected = localStorage.getItem('addsSelected');
    if (addsSelected && addsSelected != null) {
      localStorage.removeItem('addsSelected');
      return;
    }

    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete1.query_location }, (predictions, status) => {
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
    this.autocomplete1.query_location = item.description;
    this.geocoder.geocode({ placeId: item.place_id }, (results, status) => {
      if (status == 'OK' && results[0]) {
        console.log(status);
        this.selectedLat = results[0].geometry.location.lat();
        this.selectedLng = results[0].geometry.location.lng();
        this.selectedLng = results[0].geometry.location.lng();
        this.selectedAddress = this.autocomplete1.query_location;
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
        localStorage.setItem('location', 'true');
        localStorage.setItem('lat', lat);
        localStorage.setItem('address', results[0].formatted_address);
        localStorage.setItem('lng', lng);
        this.router.navigate(['home']);
      }
    }, error => {
      console.log('error in geocoder');
    });
  }

  getContent(item) {
    return (item.short_content.length > 50) ? item.short_content.slice(0, 50) + '...' : item.short_content;
  }


  getDate(item) {
    return moment(item).format('DD');
  }

  getMonth(item) {
    return moment(item).format('MMM');
  }

  removeTreatmentSearchKey() {
    this.autocomplete1.query_treatment = '';
    this.autocompleteTreatmentItems = [];
    this.selectedTreatment = '';
  }

  removeLocationSearchKey() {
    this.autocomplete1.query_location = '';
    this.autocompleteLocationItems = [];
    this.selectedLat = ''; this.selectedLng = '';
  }
}
