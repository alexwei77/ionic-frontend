import { TodoListPagePage } from './../todo-list/todo-list';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Events } from 'ionic-angular';
import * as $ from 'jquery';

import { DateTimePage } from '../date-time/date-time';
import { AddressPage } from '../address/address';

import { CartAddRemoveService } from '../../services/cart-add-services'
import { ProductsTab } from '../products/products'
import { SearchService } from '../../services/search-servicefilter'
import { CartDataProvider } from '../../providers/cart-data';
import { DateHousePage } from '../date-house/date-house';
import { DoListPage } from '../do-list/do-list';
import { FilterPipe } from '../../pipes/filter/filter'
import  * as moment  from 'moment';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  @ViewChild('navBar') navBar: Navbar;
  public isSearch: boolean = false;
  totalAmount: any = 0.00;
  modify: boolean = false;
  shops: any = [];
  cartsdata: any = [];
  delDate: any = [];
  delTime: any = [];
  petServiceList: any = [];
  housecleaingList: any = [];
  totalprice: any = 0;
  petVisitTotal: number = 0;
  dogWalkingTotal: number = 0;
  houseCleaningTotal: number = 0;
  totalNumberOfOrders: number = 0;
  filter_pet = {name: 'Pet'};
  filter_dog = {name: 'Dog'};


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartAddRemoveService,
    public searchService: SearchService,
    public cartCrud: CartDataProvider,
    public events: Events) {
    this.delDate = cartService.delDate;
    this.delTime = cartService.delTime;
    this.cartsdata = cartService.cart;
    this.shops = this.cartsdata.map((a) => (a.shopname));
    var unique = this.shops.filter(function (elem, index, self) {
      return index == self.indexOf(elem);
    });
    this.shops = unique;
    this.totalAmount = cartService.totalAmount();
    this.searchService.search = '';
    this.listenEvents();
    console.log(this.totalAmount);
    console.log(this.cartsdata);
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad CartPage');
    console.log(this.navParams);

    if (this.navParams.data.state == 'modify') {
      this.modify = true;
    }
    this.totalprice = this.navParams.data.totalprice;

  }

  listenEvents(){
    this.events.subscribe('reloadDetails', () => {
      this.petVisitTotal = 0;
      this.dogWalkingTotal = 0;
      this.houseCleaningTotal = 0;
      this.totalNumberOfOrders = 0;
      this.getLocalCart();
    });
  }

  ngOnInit(): void {
    this.navBar.setBackButtonText('');
    this.getLocalCart();
  }

  public toggle(): void {
    this.isSearch = this.isSearch ? false : true;
  }

  public SetSearchBarFocus() {
    setTimeout(function () {
      $('.searchbar-input').focus();
    }, 500);
  }
  getItems(shopname) {
    return this.cartsdata.filter(
      item => item.shopname === shopname);
  }

  increase(item: any) {
    item.count += 1;
    this.cartService.cartAddRemove(item, null);
    this.totalAmount = this.cartService.totalAmount();
  }

  decrease(item: any) {
    if (item.count == 0) return;
    item.count -= 1;
    this.cartService.cartAddRemove(item, null);
    this.totalAmount = this.cartService.totalAmount();
  }

  gotoDateTimePage() {
    this.navCtrl.push(DateTimePage);
  }

  gotoAddressPage() {
    this.cartCrud.saveCartTotal(this.dogWalkingTotal + this.petVisitTotal + this.houseCleaningTotal);
    this.navCtrl.push(AddressPage);
  }

  gotoProductsTab() {
    this.navCtrl.push(ProductsTab);
  }


  continueShopping() {
    this.navCtrl.setRoot(TodoListPagePage, { 'totalprice': this.totalprice });
  }

  getLocalCart() {
    // this.totalprice = 0;
    this.cartCrud.getCartData('pet').then((localCart) => {
      if (localCart) {
        this.petServiceList = JSON.parse(localCart);
        console.log(this.petServiceList);
        this.petServiceList.forEach(ele => {
          this.totalNumberOfOrders += ele.petdata.length;

        ele.petdata.forEach(element => {
          if(element.service.name == 'Pet Visit'){
            this.petVisitTotal += parseInt(element.service.price);
          }
          else{
            this.dogWalkingTotal += parseInt(element.service.price);
          }
        });
      });
        // this.totalprice = this.totalprice + this.petVisitTotal + this.dogWalkingTotal;
      }
    });
    this.cartCrud.getCartData('house').then((localCart) => {
      if (localCart) {
        this.housecleaingList = JSON.parse(localCart);
        console.log(this.housecleaingList.length);
        this.housecleaingList.forEach(element => {
          this.totalNumberOfOrders += 1;
          console.log(element);
          console.log(this.totalNumberOfOrders);
          this.houseCleaningTotal += parseInt(element.total);
          console.log(this.houseCleaningTotal);
        });
        // this.totalprice = this.totalprice + this.houseCleaningTotal;
      }
    })
  }


  getDayFromDate(date:Date){
    let d = new Date(date);
    let days:any[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let Months:any[] = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    return days[d.getDay()] + ' ' + Months[d.getMonth()] + ' ' + d.getDate();
  }
  deleteCart(list, index) {
    list.splice(index, 1);
  }

  goToDate(Service, i, index) {
    console.log(i);
    this.navCtrl.push(DateHousePage, { 'service': Service, 'index': i, 'i':index });
  }

  ionViewWillLeave(){
    this.cartCrud.saveCart('pet', this.petServiceList);
    this.cartCrud.saveCart('house', this.housecleaingList);
  }
}


