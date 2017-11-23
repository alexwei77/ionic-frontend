import { LoadingService } from './../../services/loading-service';
import { OrderService } from './../../services/order-services';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { MatchPage } from '../match/match';
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {
  user_data_json:any ={};
  orders:any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private orderService: OrderService,private loadingService:LoadingService, private toastCtrl:ToastController) {
   this.user_data_json = JSON.parse(localStorage.getItem("userData"));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPagePage');
  }

  ionViewWillEnter(){
    this.orderService.getMyOrders(this.user_data_json._id).subscribe(
      data => {
        console.log(data);
        this.orders = data.data;
      },
      err => {
        //this.loadingService.loading.dismiss();
        this.presentToast("Please enter the valid card information");
      }
    );
  }
  gotoMatchPage(order_id: string) {
  	this.navCtrl.push(MatchPage, {order_id: order_id});
  }
  getDayFromDate(date:Date){
    let d = new Date(date);
    let days:any[] = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    let Months:any[] = ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'];
    return days[d.getDay()] + ' ' + Months[d.getMonth()] + ' ' + d.getDate();
  }
  presentToast(msg) {
		let toast = this.toastCtrl.create({
			message: msg,
			duration: 3000,
			position: 'bottom',
			dismissOnPageChange: true
		});

		toast.onDidDismiss(() => {
			console.log('Dismissed toast');
		});

		toast.present();
	}

}
