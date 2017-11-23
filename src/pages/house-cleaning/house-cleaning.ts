
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


import { ProvidersManualPage } from '../providers-manual/providers-manual';
import { ProvidersRecommendedPage } from '../providers-recommended/providers-recommended';

import { ShareDataService } from '../../services/shared-data';

import { DateHousePage } from '../date-house/date-house';
import { HouseCleaningService } from '../../services/house-cleaning-services';

import { DoListPage } from '../do-list/do-list';
import { CartDataProvider } from '../../providers/cart-data';
import { TodoListPagePage } from './../todo-list/todo-list';
@Component({
  selector: 'page-house-cleaning',
  templateUrl: 'house-cleaning.html'
})
export class HouseCleaningPage {

  selectedBedroom: number = 3;
  selectedBathroom = 1;
  shownGroup = null;
  bedroomInfo;
  bathroomInfo;
  bedroomPrice: any = 10;
  bathroomPrice: any = 3;
  houseCart = [];
  totalprice: any = 0;
  whatsIncludedData:any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private shareDataService: ShareDataService,
    private housecleaingService: HouseCleaningService,
    private cartCrud: CartDataProvider) { }

  ionViewDidLoad() {
    this.housecleaingService.getService().subscribe(data => {
      console.log(data);
      this.bedroomInfo = Object(data).data[1];
      this.bathroomInfo = Object(data).data[0];
    }, err => {
      console.log(err)
    });
    this.housecleaingService.getDetails().subscribe(data => {
      this.whatsIncludedData = data.data;
      console.log(this.whatsIncludedData);
    }, err => {
      console.log(err)
    });
    console.log('HouseCleaningPage');
    this.getHouseCart();
    this.totalprice = parseInt(this.navParams.data.totalprice);
  }

  getHouseCart() {
    this.cartCrud.getCartData('house').then((localCart) => {
      if (localCart) {
        this.houseCart = JSON.parse(localCart);
      } else {
        this.houseCart = [];
      }
    })
  }

  openRecommended() {
    this.shareDataService.setPreviousState("House");
    this.navCtrl.push(ProvidersRecommendedPage);
  }

  openManual() {
    this.shareDataService.setPreviousState("House");
    this.navCtrl.push(ProvidersManualPage);
  }

  bedroom(item) {
    this.selectedBedroom = item.quantity;
    this.bedroomPrice = item.price;
  }

  bathroom(item) {
    this.selectedBathroom = item.quantity;
    this.bathroomPrice = item.price;
  }

  toggleGroup(group) {
    // console.log(group.email);
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  //Chang 10.14

  Proceed() {
    this.totalprice += this.bedroomPrice + this.bathroomPrice;
    this.houseCart.push({ 'bedroom': this.selectedBedroom, 'bathroom': this.selectedBathroom, 'date': "", 'total':this.bedroomPrice + this.bathroomPrice });
    this.cartCrud.saveCart('house', this.houseCart).then((res) => {
      console.log(this.totalprice);
      this.navCtrl.setRoot(TodoListPagePage, {
        'flag': 'house', 'totalprice': this.totalprice
      });
    },(err)=>{
      console.log(err);
    });

  }
}
