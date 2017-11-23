import * as $ from 'jquery'
import { Component, OnInit, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams } from 'ionic-angular';
import { CategoryListPage } from "../category-list/category-list";

import { ShopService } from '../../services/shop-services';
import { LoadingService } from '../../services/loading-service';
import { SearchService } from '../../services/search-servicefilter'
import { CartAddRemoveService } from '../../services/cart-add-services';
import { CartPage } from '../cart/cart';
/*
  Generated class for the ShopsList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-shops-list',
  templateUrl: 'shops-list.html'
})
export class ShopsListPage implements OnInit {
  items: Array<any>;
  zipcode = '';
  public isSearch: boolean = false;
  cart: any;
  @ViewChild('navBar') navBar: Navbar;

  constructor(public navCtrl: NavController, public cartService: CartAddRemoveService, public shopService: ShopService, public navParams: NavParams, public loadingService: LoadingService, public searchService: SearchService) {
    this.zipcode = '395010';
    this.cart = cartService.cart;
    this.searchService.search = '';
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
  }

  ionViewDidLoad() {
    this.loadingService.showLoader();

    this.shopService.getShopName(this.zipcode)
    .subscribe(
      data => {
        this.loadingService.loading.dismiss();
        this.items = data.data;
      },
      err => {
        console.error(err);
        this.loadingService.loading.dismiss();
        this.loadingService.presentToast(err);
      }
    );
  }

  public toggle(): void {
    this.isSearch = this.isSearch ? false : true;
  }

  public SetSearchBarFocus() {
    setTimeout(function () {
      $('.searchbar-input').focus();
    }, 500);
  }

  selectCategory(item: any) {
    this.navCtrl.push(CategoryListPage, item);
  }

  gotoCartPage() {
    this.navCtrl.push(CartPage);
  }
}
