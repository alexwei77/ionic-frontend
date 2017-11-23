import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentSavedCardsPage } from '../payment-saved-cards/payment-saved-cards';
import { OrderItemsPage } from '../order-items/order-items';
import { ModalController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-submit',
  templateUrl: 'submitform.html'
})
export class submitformPage {

  activephone: boolean=false;
  activeemail: boolean=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad submitform');
  }

  goToCheckOut() {
    this.navCtrl.push(OrderItemsPage);
  }

  gotoPayment() {
    this.navCtrl.push(PaymentSavedCardsPage);
  }

  dismiss() {
   this.viewCtrl.dismiss();
  }
}
