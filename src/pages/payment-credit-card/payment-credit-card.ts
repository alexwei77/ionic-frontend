import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

import { OrderConfirmationPage } from '../order-confirmation/order-confirmation';
import { LoginPage } from '../login/login';

import {CartAddRemoveService} from '../../services/cart-add-services'
import { CreditcardService } from '../../services/creditcard-services';
import { PaymentSavedCardsPage } from "../payment-saved-cards/payment-saved-cards";

import { FinalPage } from "../final/final";



@Component({
  selector: 'page-payment-credit-card',
  templateUrl: 'payment-credit-card.html'
})
export class PaymentCreditCardPage {

  @ViewChild('navBar') navBar: Navbar;
  items: any;
  addNewCard: any;

  totalAmount : any = [];
  constructor(public creditcardService:CreditcardService, public navCtrl: NavController, public navParams: NavParams,public cartServices:CartAddRemoveService) { 
    this.totalAmount = cartServices.totalAmount();
  
   this.addNewCard = {
    
          "number": "",
          "name": "",
          "exp_month": "",
          "exp_year": "" ,
          "cvc": "" ,
          "userId": "59c63624bbea951444927f66"
    
          }
   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentCreditCardPage');
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
  }

  addCreditcard(){
    this.creditcardService.addCard(this.addNewCard)
    .subscribe(
    data => {
       this.items = data;
        },
    err => { console.log(err) });
  }

  gotoOrderConfirmation() {
    this.navCtrl.push(OrderConfirmationPage);
  }

  goToLogin() {
    this.navCtrl.push(FinalPage);
  }
}
