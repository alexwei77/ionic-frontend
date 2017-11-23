import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShopsListPage } from '../shops-list/shops-list';

import { HouseCleaningPage } from '../house-cleaning/house-cleaning';
import { PetServicesPage } from '../pet-services/pet-services'


import { ProductsService } from '../../services/products-service';

import { CartAddRemoveService } from '../../services/cart-add-services'
import { CartDataProvider } from '../../providers/cart-data';



@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})


export class ProductsTab implements OnInit {

  items: Array<any>;
  service_id: any;
  rootNavCtrl: NavController;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private productsService: ProductsService,

    private cartService: CartAddRemoveService,
    private cartCrud: CartDataProvider) { }

  // dont call init methods in constructor - use nginit
  ngOnInit(): void {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
    this.loadSupremeCategory();
    this.cartCrud.format();
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
  }

  browse(item: any) {
    console.log(item);
    this.service_id = item._id;
    localStorage.setItem("Service-id", this.service_id);
    this.cartService.service = item;

    if (item.slug === "House Cleaning") {
      this.rootNavCtrl.push(HouseCleaningPage, {'totalprice': 0});
    }

    // if (item.slug === "pet") {
    //   this.rootNavCtrl.push(PetServicesPage);
    // }
    if (item.slug === "Pet Services") {
      this.rootNavCtrl.push(PetServicesPage, {'totalprice': 0});
    }

    if (item.slug === "Grocery Services") {
      this.rootNavCtrl.push(ShopsListPage, {'totalprice': 0});
    }
  }

}
