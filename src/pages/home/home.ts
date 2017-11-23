import { LoginPage } from './../login/login';
import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Slides, Events } from "ionic-angular";
import { SuperTabsComponent } from "ionic2-super-tabs";
import { ProductsTab } from '../products/products';
import * as $ from 'jquery';
import { SearchService } from '../../services/search-servicefilter'
import { CartAddRemoveService } from '../../services/cart-add-services';
import { CartPage } from '../cart/cart';
import { BundledealsPage } from '../bundledeals/bundledeals';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  @ViewChild('contentSlides') contentSlides: Slides;
  @ViewChild('homeTabs') homeTabs: SuperTabsComponent;
  productRoot = ProductsTab;
  dealsRoot = BundledealsPage ;
  public isSearch: boolean = false;
  public isLoggedIn: boolean = false;
  cart: any;

  productParams = {
    type: 'product',
    backButtonText: ''
  };
  serviceParams = {
    type: 'service',
    backButtonText: ''
  };
  dealsParams = {
    type: 'deals',
    backButtonText: ''
  };


  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public events: Events,
    public searchService: SearchService,
    public cartService: CartAddRemoveService) {
    this.searchService.search = '';
    this.cart = cartService.cart;
  }

  ngOnInit(): void {
    this.homeTabs.slides.pager = true;
    this.homeTabs.slides.update();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter HomePage');
    let local_user_data = localStorage.getItem('userData');
    if (local_user_data) {
      this.menuCtrl.enable(true);
      this.isLoggedIn = true;
      console.log(local_user_data);
      this.events.publish("userloggedin", JSON.parse(local_user_data));
    } else {
      this.menuCtrl.enable(false);
      this.isLoggedIn = false;
    }
  }
  public toggle(): void {
    this.isSearch = this.isSearch ? false : true;
  }

  public SetSearchBarFocus() {
    setTimeout(function () {
      $('.searchbar-input').focus();
    }, 500);
  }

  login(){
    this.navCtrl.push(LoginPage);
  }

  gotoCartPage(){
    this.navCtrl.push(CartPage);
  }
}
