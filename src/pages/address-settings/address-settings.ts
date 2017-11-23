


import { OrderItemsPage } from '../order-items/order-items';
import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Navbar, ToastController } from 'ionic-angular';
import { AddAddressPage } from '../add-address/add-address';
import { PaymentSavedCardsPage } from '../payment-saved-cards/payment-saved-cards';
import { Address } from '../address/address.model';
import { AddressService } from '../../services/address-services';
import { address } from '../../services/cart-services'
import { ApartmentschosenPage } from './../apartments-chosen/apartments-chosen';
import { OrderDisplayPage } from '../order-display/order-display';
import { CartAddRemoveService } from '../../services/cart-add-services';
import { AddApartmentPage } from './../add-apartment/add-apartment';
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'page-address-settings',
  templateUrl: 'address-settings.html'
})
export class AddressSettingsPage implements OnInit {

  // Local properties
  addresses: any[];
  filterAddresses: any[];
  addressModel: any = [];

  Address: any = address;
  showContact: boolean = false;
  showKeyArrangment: boolean = false;
  addressIsSet: boolean = false;
  isAddAddress: boolean = false;

  total: any = [];

  name: string;
  flat_no: number;
  address: string;
  zip_code: string;
  place_id: string;
  searchControl: FormControl;
  showAddress: any;
  gerRes: any;
  activeStatus: number;
  noResult: boolean;

  @ViewChild('navBar') navBar: Navbar;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private addressService: AddressService,
    public cartService: CartAddRemoveService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private toastCtrl: ToastController) {
    this.total = cartService.totalAmount();
    this.addresses = [];
    this.showAddress = [];
  }

  loadAddress() {
    this.noResult = false;
    this.addressService.getAddress().subscribe(
      data => {
        this.gerRes = data;
        this.filterAddresses = this.gerRes.data;
        // this.showAddress = data.data;
        console.log(this.filterAddresses);
      },
      err => { console.log(err) });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');

    this.loadAddress();

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
  }

  ionViewDidEnter() {
    return this.loadAddress();
  }

  gotoAddAddressPage() {
    this.navCtrl.push(AddAddressPage);
  }

  // gotoPayment(address:any) {
  //   this.Address = address;
  //   this.navCtrl.push(PaymentSavedCardsPage);
  // }

  setAddress(address: any) {
    this.Address = address;
    this.filterAddresses = null;
    this.addressIsSet = true;
    this.showKeyArrangment = true;
    //this.navCtrl.push(OrderDisplayPage, { address: this.Address });
  }

  getItems(ev: any) {
    this.addressIsSet = false;
    this.showKeyArrangment = false;
    this.showContact = false;
    this.isAddAddress = false;
    // set val to the value of the searchbar
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val.length != 0) {
      if (val.length >= 3) {
        this.filterAddresses = this.addresses.filter((item) => {
          return (item.full_address.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.appartment_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
        if (this.filterAddresses.length != 0) {
          this.showContact = true;
        } else {
          this.addressIsSet = false;
          this.showKeyArrangment = false;
          this.showContact = false;
          this.isAddAddress = true;
        }
      }
      else {
        this.filterAddresses = null;
        this.addressIsSet = false;
        this.showKeyArrangment = false;
        this.showContact = false;
      }
    }
    else {
      this.filterAddresses = null;
      this.addressIsSet = false;
      this.showKeyArrangment = false;
      this.showContact = false;
      this.isAddAddress = false;
    }
  }
  gotoOrderItems() {
    this.navCtrl.push(OrderItemsPage);
  }
  gotoOrderDisplay() {
    console.log(this.activeStatus);
    if (this.activeStatus == null || this.activeStatus == undefined) {
      this.presentToast('Please Select Address');
    } else {
      this.navCtrl.push(ApartmentschosenPage);
    }
  }

  searchAddress(ev: any) {
    this.noResult = false;
    let val = ev.target.value;
    //  console.log(ev);
    // console.log(val);
    // // if the value is an empty string don't filter the items
    if (val.length != 0) {
      if (val.length >= 3) {

        this.addressService.searchAddress(val).subscribe(data => {
          console.log(data);
          this.gerRes = data;
          this.filterAddresses = this.gerRes.data;
          console.log(this.showAddress);
          if (this.filterAddresses.length <= 0) {
            this.noResult = true;
          }
        },
          err => { console.log(err) });
        //     this.filterAddresses = this.showAddress.filter((item) => {
        //       return (item.address.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //     })
        //     console.log( this.filterAddresses);
      }
      //  else {
      //   this.filterAddresses = null;
      // }
    }
    else {

      this.loadAddress();
      //this.filterAddresses = null;
    }
  }

  goAddbuilding() {
    this.navCtrl.push(AddApartmentPage);

  }


  selectAdd(full_address, index) {
    console.log(full_address);
    localStorage.setItem("selectedAddress", JSON.stringify(full_address));
    console.log(index);
    this.activeStatus = index;

  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}
