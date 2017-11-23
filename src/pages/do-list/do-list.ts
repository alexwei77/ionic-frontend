import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShopsListPage } from '../shops-list/shops-list';

import { HouseCleaningPage } from '../house-cleaning/house-cleaning';
import { PetServicesPage } from '../pet-services/pet-services'
import * as $ from 'jquery';

import { ProductsService } from '../../services/products-service';

import { CartAddRemoveService } from '../../services/cart-add-services'
import { DateHousePage } from '../date-house/date-house';
import { CartPage } from '../cart/cart';
import { CartDataProvider } from '../../providers/cart-data';



@Component({
  selector: 'page-do-list',
  templateUrl: 'do-list.html'
})


export class DoListPage implements OnInit {

  items: Array<any>;
  service_id: any;
  rootNavCtrl: NavController;
  public isSearch: boolean = false;
  totalprice: any = 0;
  checked=[0,0,0,0,0];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productsService: ProductsService,
    private cartService: CartAddRemoveService,
    private cartCrud:CartDataProvider) { }

  // dont call init methods in constructor - use nginit
  ngOnInit(): void {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
    this.loadSupremeCategory();
    this.getLocalCart();
  }

  loadSupremeCategory() {
    this.productsService.getSupremeCategory()
      .subscribe(
      data => {
        if (this.navParams.data.type === 'product') {
          this.items = data.data.products;
        }
        else {
          this.items = data.data.services;
        }
      },
      err => { console.log(err) });
    this.totalprice = this.navParams.data.totalprice;
  }

  getLocalCart(){
    this.cartCrud.getCartData('pet').then((localCart)=>{
      if (localCart){
        this.checked[2] = 1;
      } else{
        this.checked[2] = 0;
      }
    })
    this.cartCrud.getCartData('house').then((localCart)=>{
      if (localCart){        
        this.checked[1] = 1;
      } else{
        this.checked[1] = 0;
      }
    })
  }

  browse(item: any) {
    console.log(item);
    this.service_id = item._id;
    localStorage.setItem("Service-id", this.service_id);
    this.cartService.service = item;

    if (item.slug === "House Cleaning") {
      this.navCtrl.push(HouseCleaningPage, { 'totalprice': this.totalprice });
    }

    // if (item.slug === "pet") {
    //   this.rootNavCtrl.push(PetServicesPage);
    // }
    if (item.slug === "Pet Services") {
      this.navCtrl.push(PetServicesPage, { 'totalprice': this.totalprice });
    }

    if (item.slug === "grocery") {
      this.rootNavCtrl.push(ShopsListPage, { 'totalprice': this.totalprice });
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

  goToCart() {
    this.navCtrl.push(CartPage, { state: 'modify', 'totalprice': this.totalprice });
  }

}
