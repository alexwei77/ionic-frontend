
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { PetService } from './../../services/pet-services';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingService } from './../../services/loading-service';


@Component({
  selector: 'page-add-pet',
  templateUrl: 'add-pet.html'
})
export class AddPetPage {


  breed: string = "Lebra";
  type: string = "Dog";
  public allPetTypes: any[];
  public allBreedTypes: any[];
  public petImage: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController,public petService:PetService,private camera: Camera, public loadingService: LoadingService) {
  }

  ngOnInit(): void {
    this.petImage="";
    this.getPetTypes();
  }

  savePet(name, type, breed, notes) {

    let newPet = {
      name: name,
      type: type,
      breed: breed,
      notes: notes,
      image:this.petImage
    }

    this.view.dismiss(newPet);
    this.petImage="";
    console.log(newPet);
  }
  getPetTypes(){
    this.loadingService.showLoader();
     this.petService.getPetsTypes().subscribe(
      data => {
        this.allPetTypes = data.data;
        console.log(this.allPetTypes);
        this.loadingService.loading.dismiss();
      },
      err => { console.log(err) });
  }
  getPetBreeds(id:string){
    this.loadingService.showLoader();
     this.petService.getPetsBreed(id).subscribe(
      data => {
        this.allBreedTypes = data.data;
        console.log(this.allBreedTypes);
        this.loadingService.loading.dismiss();
      },
      err => {
        this.loadingService.loading.dismiss();
        console.log(err);
       });
  }


  close() {
    this.view.dismiss();
  }

  takePicture(){
    console.log("Take Picture");
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }).then((imageData) => {
       this.petImage = "data:image/jpeg;base64," + imageData;
        console.log(this.petImage);

      }, (err) => {
        console.log(err);
       // Handle error
      });
  }

}
