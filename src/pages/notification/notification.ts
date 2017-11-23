import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { NotificationService } from '../../services/notification-service';

/*
  Generated class for the Notification page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  user_data_json:any = {};
  notifications: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private notificationService :NotificationService,private toastCtrl:ToastController) {
    this.user_data_json = JSON.parse(localStorage.getItem("userData"));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
    this.getNotifications()
  }

  getNotifications(){
    this.notificationService.getNotifications(this.user_data_json._id).subscribe(
      data => {
        console.log(data);
        this.notifications = data.data;
      },
      err => {
        //this.loadingService.loading.dismiss();
        this.presentToast("Please enter the valid card information");
      }
    );
  }
  readNotification(notification:any,index){
    this.notificationService.readNotification({'notificationId': notification._id,'isRead':true}).subscribe(
      data => {
        console.log(data);
        this.notifications[index].isRead = true;
      },
      err => {
        //this.loadingService.loading.dismiss();
        this.presentToast("Please enter the valid card information");
      }
    );
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
