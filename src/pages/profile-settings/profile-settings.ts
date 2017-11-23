import { ImagePicker } from '@ionic-native/image-picker';
import { LoadingService } from './../../services/loading-service';
import { UserService } from './../../services/user-services';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-profile-settings',
  templateUrl: 'profile-settings.html'
})
export class ProfileSettingsPage {
  newEmail: string ='';
  passwords: any = {};
  userData: any = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
    public loadingService: LoadingService,
    private toastCtrl: ToastController,
    private imagePicker: ImagePicker
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSettingsPagePage');
  }

  ionViewWillEnter(){
    this.userData = JSON.parse(localStorage.getItem("userData"));
  }

  changeEmail(){
    this.userService.resetEmail({userId:this.userData._id,email: this.newEmail}).then((result) => {
      console.log(result);
      this.presentToast("Email reset successfully");
      this.userData.email = this.newEmail;
      localStorage.setItem('userData',JSON.stringify(this.userData));
      // this.loadingService.loading.dismiss();
      this.newEmail = "";
		}, (err) => {
			this.presentToast(err);
			// this.loadingService.loading.dismiss();
		});
  }

  changePassword(){
    this.passwords.userId = this.userData._id;
    this.userService.changePassword(this.passwords).then((result) => {
      console.log(result);
      this.presentToast("Password reset successfully");
      // this.loadingService.loading.dismiss();
      this.passwords = {};
		}, (err) => {
			this.presentToast(err);
			// this.loadingService.loading.dismiss();
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

  chooseImage(){
    let options = {
      maximumImagesCount:1,
      // outputType: 1
    }
    this.imagePicker.getPictures(options).then((results) => {
      let imageData: any = {
        name: "profile.png"
      };
      for (var i = 0; i < results.length; i++) {
          imageData.base64 = results[i];
          // this.userService.uploadPhoto(imageData).then((result) => {
          //   console.log(results);
          //   this.loadingService.loading.dismiss();
          // }, (err) => {
          //   this.presentToast(err);
          //   this.loadingService.loading.dismiss();
          // });
      }
      console.log(results);

    }, (err) => { });
  }

}
