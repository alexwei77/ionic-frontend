import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentSavedCardsPage } from '../payment-saved-cards/payment-saved-cards';
import { OrderItemsPage } from '../order-items/order-items';

@Component({
  selector: 'page-apartments',
  templateUrl: 'apartments.html'
})
export class ApartmentsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApartmentsPagePage');
  }

  goToCheckOut() {
    this.navCtrl.push(OrderItemsPage);
  }

  gotoPayment() {
    this.navCtrl.push(PaymentSavedCardsPage);
  }


}
