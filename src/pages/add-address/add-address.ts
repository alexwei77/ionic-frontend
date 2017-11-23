import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';

import { Address } from '../address/address.model';
import { AddressService } from '../../services/address-services';
import { HomePage } from '../home/home';
/*
  Generated class for the AddAddress page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html'
})
export class AddAddressPage implements OnInit {

  addresses: any[];
  addressModel: any = [];
  name: string;
  flat_no: number;
  address: string;
  zip_code: string;
  place_id: string;
  searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild('navBar') navBar: Navbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private addressService: AddressService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    // this.navBar.setBackButtonText('');
    //create search FormControl
    this.searchControl = new FormControl();
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(place);
          this.addressModel.full_address = place.formatted_address;
          // this.addressModel.place_id = place.place_id;

          // iterate over address_components array and check if it contains postal_code
          for (let i in place.address_components) {
            let element = place.address_components[i];
            if (element.types[0] == "postal_code") {
              //if it it does, bind it to input field
              this.addressModel.zip_code = element.long_name;
            } else {
              // if not, set it to null
              this.addressModel.zip_code = null;
            }
          }

        });
      });
    });
  }

  submitAddress(): void {
    this.addressService.addAddress(this.addressModel)
      .subscribe(data => {
        this.name = data.name;
        //this.flat_no = data.flat_no;
        // just pass the above set zip code from input to POST request
        this.zip_code = data.zip_code;
        // this.addressModel.place_id;
        // console.log(this.addressModel.place_id);
        console.log(JSON.stringify(data));

      }, err => { console.log(err) });

    this.navCtrl.pop();
    this.navCtrl.setRoot(HomePage);
  }
}
