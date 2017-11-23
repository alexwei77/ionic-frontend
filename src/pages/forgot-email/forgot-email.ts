import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

import { UserService } from '../../services/user-services';
import { LoadingService } from '../../services/loading-service';

@Component({
  selector: 'page-forgot-email',
  templateUrl: 'forgot-email.html'
})
export class ForgotEmailPage {

	private r_email: string;

	constructor(public navCtrl: NavController,
		public navParams: NavParams,
		public userService: UserService,
		public loadingService: LoadingService,
		private toastCtrl: ToastController
	) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad ForgotEmailPagePage');
	}

	resetPassword() {
		console.log('resetPassword');
		// this.r_email
		this.loadingService.showLoader();
		this.userService.resetPassword({email: this.r_email}).then((result) => {
			console.log(result);
			this.loadingService.loading.dismiss();
		}, (err) => {
			this.presentToast(err);
			this.loadingService.loading.dismiss();
		});
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
