

import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";
// import { PetServicesPage } from '../pet-services/pet-services';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class NotificationService {

  constructor(private http: Http) { }

  // http://192.241.167.128/api/card

  private Url = SERVER_URL + 'api/user/notification';

  getNotifications(id: string): Observable<any> {
    return this.http.get(this.Url + "/" + id)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

  readNotification(data: any): Observable<any> {
    return this.http.post(this.Url, data)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }

}
