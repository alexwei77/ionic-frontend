import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';

import { DateTimePage } from '../date-time/date-time';

import { ProductDetailsPage } from '../product-details/product-details';
import { ShopService } from '../../services/shop-services';
import { LoadingService } from '../../services/loading-service';
import { CartAddRemoveService } from '../../services/cart-add-services';
import { carts } from '../../services/cart-services';
import {ShopsListPage} from '../shops-list/shops-list'
import {SearchService} from '../../services/search-servicefilter'
/*
  Generated class for the ProductListByCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-product-list-by-category',
    templateUrl: 'product-list-by-category.html'
})
export class ProductListByCategory {
    items: any;
    // searchText='';
    cart: any = carts;

    constructor(public navCtrl: NavController, public navParams: NavParams, private app: App, public shopService: ShopService, public loadingService: LoadingService, public cartService: CartAddRemoveService,public searchService:SearchService ) {
        this.searchService.search='';
    }

    ngOnInit(): void {
        // console.log(this.navParams.data);
    }

    ionViewDidLoad() {
        this.loadingService.showLoader();

        this.shopService.getItems(this.navParams.data.subcategory._id)
        .subscribe(
            data => {
                this.loadingService.loading.dismiss();
                this.items = data.data;
                for (var index = 0; index < this.items.length; index++) {

                    var isCart = this.cart.filter(
                        item => item._id === this.items[index]._id);

                    ///console.log('sdfds');

                    // console.log(isCart);

                    if (isCart.length > 0) {
                        this.items[index].count = isCart[0].count;
                    }
                    else {

                        this.items[index].count = 0;
                    }
                }

            },
            err => {
                console.error(err);
                this.loadingService.loading.dismiss();
                this.loadingService.presentToast(err);
            }
        );
    }

    getItems(category, subcategory) {
        // console.log("param category", category);
        // console.log("param subcategory", subcategory);
        // this.loadingService.showLoader();
        // this.shopService.getItems(this.navParams.data.shop._id, category._id, subcategory._id).then((res) => {
        //     this.loadingService.loading.dismiss();
        //     console.log("items:", res);
        //     this.items = res;
        // });
    }

    increase(item: any) {
        item.count += 1;
        this.cartService.cartAddRemove(item, this.navParams.data.shop);
    }

    decrease(item: any) {
        if (item.count == 0) return;
        item.count -= 1;
        this.cartService.cartAddRemove(item, this.navParams.data.shop);
    }

    gotoProductDetail(item: any) {
        this.app.getRootNav().push(ProductDetailsPage, {
            item: item,
            shop: this.navParams.data.shop
        });
    }

    gotoDateTimePage() {
        this.app.getActiveNav().push(DateTimePage);
        //this.navCtrl.push(DateTimePage);
    }

    gotoShopListPage()
    {
       // this.navCtrl.push(ShopsListPage);
      //  this.app.getRootNav().push(ShopsListPage);
        //this.app.getActiveNav().push(ShopsListPage);
    }

}
