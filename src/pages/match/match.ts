import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { OrderService } from '../../services/order-services';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'page-match',
  templateUrl: 'match.html'
})
export class MatchPage {
	private order_id: any;
  match_list: any = [];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public orderService: OrderService,
		public loadingService: LoadingService
	) {
		this.order_id = this.navParams.get('order_id');
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad MatchPagePage');
		console.log(this.order_id);
		this.getMatches();
	}

	formatDate(d: string) {
		let month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let dd = new Date(d);
		return month[dd.getMonth()] + " " + ('0' + dd.getDate()).slice(-2) + ", " + dd.getFullYear() + " at " + ('0' + dd.getHours()).slice(-2) + ":" + ('0' + dd.getMinutes()).slice(-2);
		// return month[dd.getMonth()] + " " + ('0' + dd.getDate()).slice(-2) + ", " + dd.getFullYear() + " at " + dd.format("hh:mm");
	}

	getMatches() {
		this.loadingService.showLoader();
		this.orderService.getMatches(this.order_id).subscribe((res) => {
			console.log(res.data);
			if (res.data.length > 0) {
				this.match_list = res.data;
			} else {
				this.match_list = [];
			}
			this.loadingService.loading.dismiss();
		}, (err) => {
			console.log(err);
			this.match_list = [];
			this.loadingService.loading.dismiss();

		})
	}

}
