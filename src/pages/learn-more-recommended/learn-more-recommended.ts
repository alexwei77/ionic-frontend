import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DateHousePage } from '../date-house/date-house';

import { ProviderService } from '../../services/provider-services';
import { ShareDataService } from '../../services/shared-data';


@Component({
  selector: 'page-learn-more-recommended',
  templateUrl: 'learn-more-recommended.html'
})
export class LearnMoreRecommendedPage {

  username: string;
  about: string;
  image: string;
  speciality: string;
  education: string;
  id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public providerService: ProviderService,
    private shareDataService: ShareDataService) { }

  ionViewDidLoad() {
    console.log('Learn More Recommended Page');
  }

  ngOnInit(): void {
    this.id = this.shareDataService.getProviderId();
    this.getSingleProvider();
  }

  getSingleProvider() {
    this.providerService.getSingleProvider(this.id)
      .subscribe(
      data => {
        this.username = data.username;
        this.about = data.about;
        this.image = data.image;
        this.speciality = data.speciality;
        this.education = data.education;
      },
      err => { console.log(err) });
  }

  goToDate() {
    this.navCtrl.push(DateHousePage);
  }

}
