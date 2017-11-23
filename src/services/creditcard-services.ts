import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Address } from '../pages/address/address.model';
import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";
// import { PetServicesPage } from '../pet-services/pet-services';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreditcardService {

    constructor(private http: Http) { }

// http://192.241.167.128/api/card

    private Url = SERVER_URL + 'api/card';

    addCard(reqData: any): Observable<any> {
        return this.http.post(this.Url, reqData)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

    getSavedCardsbyUserID(id: string): Observable<any> {
        return this.http.get(this.Url + "/user/" + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    deleteCard(cardId:string,data:any): Observable<any> {
      return this.http.post(this.Url + '/' + cardId, data)
          .map((res: Response) => res.json())
          .catch((error: any) => Observable.throw(error.json() || 'Server error'));
  }
    // addquestion(data) {
    //     let request=data;
    //      let headers: Headers = new Headers();
    //      let reqOption: RequestOptions = new RequestOptions({ method: RequestMethod.Put, headers: headers });
    //      return this.HttpHelper.post(Base_url + 'api/User/AddQuestion',request,reqOption)
    //  }






}
