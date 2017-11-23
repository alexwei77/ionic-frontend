import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar } from 'ionic-angular';

import { SuperTabsComponent } from "ionic2-super-tabs";
import { ProfileSettingsPage } from '../../pages/profile-settings/profile-settings'
import { AddressSettingsPage } from '../../pages/address-settings/address-settings'
import { CardSettingsPage } from '../../pages/card-settings/card-settings'

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  profile = ProfileSettingsPage;
  address = AddressSettingsPage;
  cards = CardSettingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPagePage');
  }

}
