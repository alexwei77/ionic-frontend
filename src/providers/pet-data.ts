import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable()
export class PetDataProvider {

  constructor(public storage: Storage) {

  }

  getData() {
    return this.storage.get('pets');
  }

  save(data) {
    let newData = JSON.stringify(data);
    this.storage.set('pets', newData);
  }

}