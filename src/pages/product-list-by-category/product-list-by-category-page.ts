import { Component, OnInit, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams, Slides } from 'ionic-angular';
import { ProductListByCategory } from "./product-list-by-category";
import { ShopsListPage } from '../shops-list/shops-list'
// import {SuperTabsComponent} from "ionic2-super-tabs";
import { DateTimePage } from '../date-time/date-time';
import * as $ from 'jquery';

import { CartPage } from '../cart/cart';
import { LoadingService } from '../../services/loading-service';
import { CartAddRemoveService } from '../../services/cart-add-services';
import { SearchService } from '../../services/search-servicefilter'

/*
  Generated class for the ProductListByCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-list-by-category-page',
  templateUrl: 'product-list-by-category-page.html'
})
export class ProductListByCategoryPage implements OnInit {
  @ViewChild('navBar') navBar: Navbar;
  @ViewChild('contentSlides') contentSlides: Slides;
  modify: boolean;
  root = ProductListByCategory;
  cart: any;
  searchText = '';
  public isSearch: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingService: LoadingService, public cartService: CartAddRemoveService, public searchService: SearchService) {
    this.modify = false;
    this.cart = cartService.cart;
    this.searchService.search = '';
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
    this.loadingService.showLoader();
  }

  ionViewDidEnter() {
    this.loadingService.loading.dismiss();
  }
  public toggle(): void {
    this.isSearch = this.isSearch ? false : true;
  }

  public SetSearchBarFocus() {
    setTimeout(function () {
      $('.searchbar-input').focus();
    }, 500);
  }
  gotoCartPage() {
    this.navCtrl.push(CartPage);
  }
  gotoShopListPage() {
    this.navCtrl.push(ShopsListPage);
  }

  gotoDateTimePage() {
    this.navCtrl.push(DateTimePage);
  }
}
