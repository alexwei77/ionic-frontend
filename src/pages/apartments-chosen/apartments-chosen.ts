import { CartDataProvider } from './../../providers/cart-data';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PaymentSavedCardsPage } from '../payment-saved-cards/payment-saved-cards';
import { OrderItemsPage } from '../order-items/order-items';
import { AddApartmentPage } from './../add-apartment/add-apartment';
import { InvoicePage } from "../invoice/invoice";

@Component({
  selector: 'page-apartments',
  templateUrl: 'apartments-chosen.html'
})
export class ApartmentschosenPage implements OnInit {

  activephone: boolean = false;
  activeemail: boolean = false;
  selectAddress: any;
  keyArrangement: any = {};
  selectedKeyArr: string = "Door will be open";
  cartTotal:number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams,public cartCrud: CartDataProvider) {
    this.cartCrud.getTotal().then((cartTotal) => {
      if (cartTotal) {
        this.cartTotal = cartTotal;
      }
    })
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ApartmentschosenPage');
  }

  ngOnInit() {
    this.selectAddress = JSON.parse(localStorage.getItem("selectedAddress"));
    console.log(this.selectAddress);
  }

  goToCheckOut() {
    this.navCtrl.push(OrderItemsPage);
  }

  goToInvoice(): void {
    localStorage.setItem("selectedAddress",JSON.stringify(this.selectAddress));
    localStorage.setItem('keyArrangement',JSON.stringify(this.keyArrangement));
    this.navCtrl.push(InvoicePage);
  }

  activatedPhone() {
    this.activephone = true;
    this.activeemail = false;
    this.keyArrangement.contactBy = "Phone";
  }
  activatedEmail() {
    this.activephone = false;
    this.activeemail = true;
    this.keyArrangement.contactBy = "E-Mail";
  }
  changeKeyArrangement(text:string){
    this.selectedKeyArr = text;
    this.keyArrangement.keyArrangments = text;
    
  }

}
