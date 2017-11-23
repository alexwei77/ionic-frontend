import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

import { FinalPage } from "../final/final";
import { PaymentCreditCardPage } from '../payment-credit-card/payment-credit-card';

/*
  Generated class for the PaymentSavedCards page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-saved-details',
  templateUrl: 'saved-details.html'
})
export class SavedDetailsPage {

  methods = [
      {
          'cardnum': '5241 XXXX XXXX 0950',
          'name': 'Standart Chartered',
          'show': true
      },
      {
          'cardnum': '5241 XXXX XXXX 0950',
          'name': 'Wells Fargo',
          'show': false
      },
      {
          'cardnum': '5241 XXXX XXXX 0950',
          'name': 'Japan`s Diner',
          'show': false
      }
  ];
  constructor(public navCtrl: NavController, public navParams: NavParams, private app: App) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedDetailsPage');
  }

  ngOnInit(): void { }

  goToFinalPage() {
    this.app.getRootNav().push(FinalPage);
  }

  onCardSelect(method: any)
  {
    this.methods.forEach((o, i, a) => a[i].show = false)
    method.show = true;
  }
}
