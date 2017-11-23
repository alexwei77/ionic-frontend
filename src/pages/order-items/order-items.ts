import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';
import {CartAddRemoveService} from '../../services/cart-add-services'

/*
  Generated class for the OrderItems page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-items',
  templateUrl: 'order-items.html'
})
export class OrderItemsPage {
  shops: any = [];
  items: any = [];
  totalAmount:any=0.00;
  // items = [
  //     {
  //       name: 'Banana',
  //       cost: 0.33,
  //       count: 3,
  //     },
  //     {
  //       name: 'Banana',
  //       cost: 0.33,
  //       count: 3,
  //     },
  //     {
  //       name: 'Banana',
  //       cost: 0.33,
  //       count: 3,
  //     },
  //     {
  //       name: 'Banana',
  //       cost: 0.33,
  //       count: 3,
  //     },
  //     {
  //       name: 'Banana',
  //       cost: 0.33,
  //       count: 3,
  //     }
  // ];

  @ViewChild('navBar') navBar : Navbar;

  constructor(public navCtrl: NavController, public navParams: NavParams,public cartService:CartAddRemoveService) {
    this.items = cartService.cart;
    this.totalAmount = cartService.totalAmount();
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderItemsPage');
    this.totalAmount = this.cartService.totalAmount();
  }

  increase(item: any){
      item.count += 1;
      this.cartService.cartAddRemove(item,null);
      this.totalAmount = this.cartService.totalAmount();
  }

  decrease(item: any){
      if (item.count == 0) return;
      item.count -= 1;
      this.cartService.cartAddRemove(item,null);
      this.totalAmount = this.cartService.totalAmount();
  }

}
