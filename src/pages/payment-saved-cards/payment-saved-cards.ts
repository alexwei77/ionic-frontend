import { CartDataProvider } from './../../providers/cart-data';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { SuperTabsComponent } from "ionic2-super-tabs";

import { SavedDetailsPage } from './saved-details';
import { CreditCardPage } from './credit-card'

import { CartAddRemoveService } from '../../services/cart-add-services';
import { CreditcardService } from '../../services/creditcard-services';
import { LoadingService } from '../../services/loading-service';

import { PayPalPage } from '../../pages/paypal-payment/paypal-payment'


import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

/*
  Generated class for the PaymentSavedCards page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-payment-saved-cards',
  templateUrl: 'payment-saved-cards.html'
})
export class PaymentSavedCardsPage {

  @ViewChild('navBar') navBar: Navbar;
  // @ViewChild('paymentTabs') paymentTabs: SuperTabsComponent;

  private user_id: any;
  tabs_loaded: boolean = false;
  tabs: any = [];

  // tabs = [
  //   {
  //     'page': CreditCardPage,
  //     'title': 'Credit Card'
  //   },
  //   {
  //     'page': PayPalPage,
  //     'title': 'PayPal'
  //   }
  // ];

  // savedDetails = SavedDetailsPage;
  totalAmount: any = 0;
  discAmount: any = 0.00;
  netAmount: any = 0.00;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartSevices: CartAddRemoveService,
    public creditcardService: CreditcardService,
    private payPal: PayPal,
    public loadingService: LoadingService,
    public cartCrud: CartDataProvider,
  ) {
    this.totalAmount = cartSevices.totalAmount();
    var promocodepr = this.navParams.get('promocodepr');
    if (promocodepr != "") {
      this.discAmount = (this.totalAmount * (parseFloat(promocodepr) / 100)).toFixed(2);
      this.netAmount = (this.totalAmount - this.discAmount).toFixed(2);
    }
    this.cartCrud.getTotal().then((cartTotal) => {
      if (cartTotal) {
        this.totalAmount = cartTotal;
      }
    })
  }
  ngOnInit(): void {
    this.navBar.setBackButtonText('');
    this.initTabs();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSavedCardsPage');
  }
  initTabs() {
    // get saved card details
    let saved_cards = [];
    if (this.user_id !== undefined) {
      this.loadingService.showLoader();
      this.creditcardService.getSavedCardsbyUserID(this.user_id).subscribe(
        data => {
          saved_cards = data.data;
          if (saved_cards.length > 0) {
            // let tabs_copy = this.getCopyOfTabs();
            // tabs_copy.unshift({'page': SavedDetailsPage,'title': 'Saved Detail'});
            // this.tabs = tabs_copy;
            this.loadTabs(1);
          } else {
            this.loadTabs(0);
          }
          this.loadingService.loading.dismiss();
        },
        err => {
          console.log(err);
          this.loadTabs(0);
          this.loadingService.loading.dismiss();
        }
      );
    } else {
      this.loadTabs(0);
    }
  }
  loadTabs(flag:number) {
    if (flag === 1) {
      this.tabs = [
        {
          'page': SavedDetailsPage,
          'title': 'Saved Detail'
        },
        {
          'page': CreditCardPage,
          'title': 'Credit Card'
        },
        {
          'page': PayPalPage,
          'title': 'PayPal'
        }
      ];
    } else {
      this.tabs = [
        {
          'page': CreditCardPage,
          'title': 'Credit Card'
        },
        {
          'page': PayPalPage,
          'title': 'PayPal'
        }
      ];
    }
    this.tabs_loaded = true;
    // setTimeout(function(){
    //   this.paymentTabs.slides.pager = true;
    //   this.paymentTabs.slides.update();
    // }, 3000);

  }
  getCopyOfTabs(): any {
    return JSON.parse(JSON.stringify(this.tabs));
  }

}
