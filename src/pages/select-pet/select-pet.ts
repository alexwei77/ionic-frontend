import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { AddPetPage } from '../add-pet/add-pet';

import { PetService } from '../../services/pet-services';
import { ShareDataService } from '../../services/shared-data';
import { DateHousePage } from '../date-house/date-house';
import { PetDataProvider } from '../../providers/pet-data';

@Component({
  selector: 'page-select-pet',
  templateUrl: 'select-pet.html'
})
export class SelectPetPage implements OnInit {

  header: string;
  // pets: Array<any>;

  public pets = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public petService: PetService,
    public shareDataService: ShareDataService,
    public petCrud: PetDataProvider) { }

  ngOnInit(): void {
    this.header = this.shareDataService.getDogServiceName();
    this.getLocalPets();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Select-pet page');
  }

  // getPets() {
  //   this.petService.getPets()
  //     .subscribe(
  //     data => {
  //       this.pets = data
  //       console.log(this.pets);
  //     },
  //     err => { console.log(err) });
  // }

  addPet() {

    let addModal = this.modalCtrl.create(AddPetPage);

    addModal.onDidDismiss((item) => {

      if (item) {
        this.saveItem(item);
      }

    });

    addModal.present();

    // this.navCtrl.push(AddPetPage);
  }

  saveItem(item) {
    this.pets.push(item);
    this.petCrud.save(this.pets);
  }

  removePet(item) {
    // console.log(item);
    this.pets.splice(item, 1);
    this.petCrud.save(this.pets);
  }

  getLocalPets() {
    this.petCrud.getData().then((localPets) => {

      if (localPets) {
        this.pets = JSON.parse(localPets);
      }
      console.log(localPets);

    });
  }

  goToDate() {
    this.navCtrl.push(DateHousePage);
  }

}
