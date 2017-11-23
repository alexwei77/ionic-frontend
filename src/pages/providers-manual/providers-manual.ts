import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LearnMoreManualPage } from '../learn-more-manual/learn-more-manual';
import { DateHousePage } from '../date-house/date-house';
import { SelectPetPage } from '../select-pet/select-pet';

import { ProviderService } from '../../services/provider-services';
import { ShareDataService } from '../../services/shared-data';

@Component({
  selector: 'page-providers-manual',
  templateUrl: 'providers-manual.html'
})
export class ProvidersManualPage implements OnInit {

  items: Array<any>;
  shownGroup = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public providerService: ProviderService,
    private shareDataService: ShareDataService) { }

  ionViewDidLoad() {
    console.log('Providers Manual Page');
  }

  ngOnInit(): void {
    this.getProviders();
    console.log(this.shareDataService.getPreviousState());
  }


  getProviders() {
    this.providerService.getProviders()
      .subscribe(
      data => {
        this.items = data
        console.log(this.items);
      },
      err => { console.log(err) });
  }


  learnMore(id) {
    this.shareDataService.setProviderId(id);
    this.navCtrl.push(LearnMoreManualPage);
  }

  toggleGroup(group) {
    // console.log(group.email);
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  nextPage() {
    if (this.shareDataService.getPreviousState() === "House") {
      this.navCtrl.push(DateHousePage);
    }
    else {
      this.navCtrl.push(SelectPetPage);
    }
  }

}
