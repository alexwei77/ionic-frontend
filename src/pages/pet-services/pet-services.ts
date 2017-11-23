import { TodoListPagePage } from './../todo-list/todo-list';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { FormControl, FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { ProvidersManualPage } from '../providers-manual/providers-manual';
// import { ProvidersRecommendedPage } from '../providers-recommended/providers-recommended';
import { DateHousePage } from '../date-house/date-house';

import { AddPetPage } from '../add-pet/add-pet';
import { SelectPetPage } from '../select-pet/select-pet';

import { PetDataProvider } from '../../providers/pet-data';
import { CartDataProvider } from '../../providers/cart-data';
import { PetService } from '../../services/pet-services';
import { ShareDataService } from '../../services/shared-data';
import { LoadingService } from '../../services/loading-service';
import { DoListPage } from '../do-list/do-list';

@Component({
  selector: 'page-pet-services',
  templateUrl: 'pet-services.html'
})

export class PetServicesPage implements OnInit {

  petList: Array<any>;
  shownGroup = null;
  pets = [];
  myForm: FormGroup;
  activeIndex: number;
  selectService: any;
  totalprice: any = 0;
  petCart: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public petService: PetService,
    private shareDataService: ShareDataService,
    public loadingService: LoadingService,
    public petCrud: PetDataProvider,
    public cartCrud: CartDataProvider,
    private fb: FormBuilder
  ) {

  }

  ngOnInit(): void {

    this.getPets();
    this.shareDataService.setPreviousState("Pets");
    this.getLocalPets();
    this.getPetCart();
    this.myForm = this.fb.group({
      userpet: this.fb.array([])
    });
    this.totalprice = this.navParams.data.totalprice;
  }

  getPetCart() {
    this.cartCrud.getCartData('pet').then((localCart) => {
      if (localCart) {
        this.petCart = JSON.parse(localCart);
        console.log(this.petCart);
      } else {
        this.petCart = [];
      }
    });
  }

  onChange(pet: string, item: Object, isChecked: boolean) {
    const petFormArray = <FormArray>this.myForm.controls.userpet;

    if (isChecked) {
      petFormArray.push(new FormControl({ 'pet': pet, 'service': item }));
      this.totalprice += parseInt(Object(item).price);
    } else {
      let index = petFormArray.controls.findIndex(x => x.value == pet)
      this.totalprice -= parseInt(Object(item).price);
      petFormArray.removeAt(index);
    }
  }


  getPets() {
    this.loadingService.showLoader();
    this.petService.getPets().subscribe(
      data => {
        this.petList = data.data.servicescategory;
        this.loadingService.loading.dismiss();
      },
      err => {
        console.log(err);
        this.loadingService.loading.dismiss();
      });
  }

  toggleGroup(group) {
    console.log(group.name);
    this.shareDataService.setDogServiceName(group.name);
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  getLocalPets() {
    this.petCrud.getData().then((localPets) => {
      if (localPets) {
        this.pets = JSON.parse(localPets);
      }
    });
  }


  addPet() {
    let addModal = this.modalCtrl.create(AddPetPage);
    addModal.onDidDismiss((item) => {
      if (item) {
        this.saveItem(item);
      }
    });
    addModal.present();
  }

  saveItem(item) {
    this.pets.push(item);
    this.petCrud.save(this.pets);
  }

  removePet(item) {
    this.pets.splice(item, 1);
    this.petCrud.save(this.pets);
  }

  selectPet(item, i) {
    console.log(item);
    this.selectService = item;
    this.activeIndex = i;
    if (item.show == true) {
      item.show = false;
    } else {
      item.show = true;
    }
  }

  Proceed() {
    if (this.myForm.value.userpet.length <= 0) {
      this.loadingService.presentToastWithParams("Please select a pet service", 2000, 'bottom');
      return false;
    }

    else {
      this.petCart.push({'petdata': this.myForm.value.userpet, 'date':""})
      this.cartCrud.saveCart('pet', this.petCart).then(res => {
        this.navCtrl.setRoot(TodoListPagePage, {
          'flag': 'pet', 'totalprice': this.totalprice
        });
      })
    }
  }
}
