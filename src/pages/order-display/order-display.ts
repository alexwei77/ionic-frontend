import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import { CartAddRemoveService } from '../../services/cart-add-services';
import { PromocodeService } from '../../services/promocode-service';
import { PaymentSavedCardsPage } from '../payment-saved-cards/payment-saved-cards';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'page-order-display',
  templateUrl: 'order-display.html'
})



export class OrderDisplayPage {
  @ViewChild('navBar') navBar: Navbar;
  subTotalAmt: any = 0.00;
  taxAmount: any = 0.00;
  totalAmount: any = 0.00;
  netAmount: any = 0.00;
  promocode: string = "";
  promocodepr: any = 0.00;
  modify: boolean = false;
  shops: any = [];
  cartsdata: any = [];
  delDate: any = [];
  delTime: any = [];
  address: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartAddRemoveService, public promocodeService: PromocodeService, public loadingService: LoadingService) {
    this.address = navParams.data.address;
    this.delDate = cartService.delDate;
    this.delTime = cartService.delTime;
    this.cartsdata = cartService.cart;
    this.shops = this.cartsdata.map((a) => (a.service));
    var unique = this.shops.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });
    this.shops = unique;
    this.subTotalAmt = cartService.totalAmount();
    this.totalAmount = parseFloat(this.subTotalAmt) + parseFloat(this.taxAmount);
    this.netAmount = this.totalAmount;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDisplayPage');
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
  }
  getCategoryImage(shopname): string {
    return "http://192.241.167.128/public/images/services/petservices.png";
  }

  getItems(shopname) {
    return this.cartsdata.filter(
      item => item.service.name === shopname);
  }

  // increase(item: any) {
  //   item.count += 1;
  //   this.cartService.cartAddRemove(item, null);
  //   this.totalAmount = this.cartService.totalAmount();
  // }

  // decrease(item: any) {
  //   if (item.count == 0) return;
  //   item.count -= 1;
  //   this.cartService.cartAddRemove(item, null);
  //   this.totalAmount = this.cartService.totalAmount();
  // }

  gotoPayment() {
    this.navCtrl.push(PaymentSavedCardsPage, { 'promocodepr': this.promocodepr });
  }
  checkPromocode() {
    if (this.promocode != "") {
      this.promocodeService.getPromocode(this.promocode).subscribe(
        data => {
          if (data.length != 0) {
            this.promocodepr = (data[0].percentage);
            this.loadingService.presentToast("Promocode Applied");
          }
          else {
            this.loadingService.presentToast("Invalid Promocode");
          }
        },
        err => { }
      );
    }
  }
}