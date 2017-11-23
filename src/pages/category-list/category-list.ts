import { Component, OnInit, ViewChild } from '@angular/core';
import { Navbar, NavController, NavParams } from 'ionic-angular';
import { ProductListByCategoryPage } from "../product-list-by-category/product-list-by-category-page";
import * as $ from 'jquery';

import { ShopService } from '../../services/shop-services';
import { LoadingService } from '../../services/loading-service';
import { SearchService } from '../../services/search-servicefilter'
import { CartPage } from '../cart/cart';
import { CartAddRemoveService } from '../../services/cart-add-services';
/*
  Generated class for the CategoryList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.html'
})
export class CategoryListPage implements OnInit {
  items: Array<any> = [];
  subcategories: Array<any>;
  searchText = '';
  cart: any;
  public isSearch: boolean = false;

  @ViewChild('navBar') navBar: Navbar;

  shop: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartAddRemoveService, public shopService: ShopService, public loadingService: LoadingService, public searchService: SearchService) {
    this.searchService.search = '';
    this.cart = cartService.cart;
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
  }

  ionViewDidLoad() {
    this.shop = this.navParams.data;
    this.loadingService.showLoader();

    this.shopService.getCategories(this.shop._id)
    .subscribe(
      data => {
        this.loadingService.loading.dismiss();
        console.log('res', data);
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
    this.shopService.getSubCategories(item._id)
    .subscribe(
      data => {
        this.loadingService.loading.dismiss();
        console.log('selectCategory', data);
        this.subcategories = data.data;

        this.navCtrl.push(ProductListByCategoryPage, {
          category: item,
          shop: this.navParams.data,
          subcategories: this.subcategories
        });
      },
      err => {
        console.error(err);
        this.loadingService.loading.dismiss();
        this.loadingService.presentToast(err);
      }
    );
  }

  gotoCartPage() {
    this.navCtrl.push(CartPage);
  }
}
