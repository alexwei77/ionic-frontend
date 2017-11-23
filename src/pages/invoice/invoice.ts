import { CartDataProvider } from './../../providers/cart-data';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { PaymentCreditCardPage } from "../payment-credit-card/payment-credit-card";
import { PaymentSavedCardsPage } from "../payment-saved-cards/payment-saved-cards";

@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html'
})
export class InvoicePage {

  // pushPage = PaymentCreditCardPage;
  pushPage = PaymentSavedCardsPage;
  petServiceList: any = [];
  housecleaingList: any = [];
  petVisitTotal: number = 0;
  dogWalkingTotal: number = 0;
  totalprice: any = 0;
  selectedAddress: any = {};
  orderDate: any = {};
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public cartCrud: CartDataProvider,
  ) {
    this.cartCrud.getCartData('pet').then((localCart) => {
      if (localCart) {
        this.petServiceList = JSON.parse(localCart);
        console.log(this.petServiceList);
        this.petServiceList.forEach(ele => {
        ele.petdata.forEach(element => {
          if(element.service.name == 'Pet Visit'){
            this.petVisitTotal += parseInt(element.service.price);
          }
          else{
            this.dogWalkingTotal += parseInt(element.service.price);
          }
        });
      });
      }
    });
    this.cartCrud.getCartData('house').then((localCart) => {
      if (localCart) {
        this.housecleaingList = JSON.parse(localCart);
        console.log(this.housecleaingList);
      }
    })
    this.cartCrud.getTotal().then((cartTotal) => {
      if (cartTotal) {
        this.totalprice = cartTotal;
      }
    })
    this.selectedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
    this.orderDate = JSON.parse(localStorage.getItem('orderDate'));
  }
  getDayFromDate(date:Date){
    let d = new Date(date);
    let days:any[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let Months:any[] = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    return days[d.getDay()] + ' ' + Months[d.getMonth()] + ' ' + d.getDate();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InvoicePagePage');

  }

}
