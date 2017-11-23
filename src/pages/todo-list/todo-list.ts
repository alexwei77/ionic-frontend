import { CartDataProvider } from './../../providers/cart-data';
import { ProductsService } from './../../services/products-service';
import { CartPage } from './../cart/cart';
import { CartAddRemoveService } from './../../services/cart-add-services';
import { ShopsListPage } from './../shops-list/shops-list';
import { PetServicesPage } from './../pet-services/pet-services';
import { HouseCleaningPage } from './../house-cleaning/house-cleaning';
import { Component, OnInit} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListPagePage implements OnInit {
  service_id: any;
  totalprice: any = 0;
  rootNavCtrl: NavController;
  items: Array<any>;
  checked=[0,0,0,0,0];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private cartService: CartAddRemoveService,
    private productsService: ProductsService,
    private cartCrud:CartDataProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TodoListPagePage');
  }

  ngOnInit(): void {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');
    this.loadSupremeCategory();
    // this.getLocalCart();
  }
  //checkboux

  data = {
    new: true,
    first: false
  };

   //checkboux

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
        console.log(this.items);
        this.getLocalCart();
      },
      err => { console.log(err) });
    this.totalprice = this.navParams.data.totalprice;
  }

  getLocalCart(){
    this.cartCrud.getCartData('pet').then((localCart)=>{
      if (localCart){
        this.items[2].new = 1
        this.checked[2] = 1;
      } else{
        this.items[2].new = 0
        this.checked[2] = 0;
      }
    })
    this.cartCrud.getCartData('house').then((localCart)=>{
      if (localCart){
        this.items[1].new = 1
        this.checked[1] = 1;
      } else{
        this.items[1].new = 0
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

  goToCart() {
    this.navCtrl.push(CartPage, { state: 'modify', 'totalprice': this.totalprice });
  }

}
