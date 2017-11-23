import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { SERVER_URL } from "./config";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PetService {
    constructor(private http: Http) { }

    private petsCategories = SERVER_URL + 'api/supremecategory/599bc65a38f88f5f453654d0/categories';
    // private petsCategories = SERVER_URL + 'api/category';
    
    private allPets = SERVER_URL + 'api/pet';
    private petTypes = SERVER_URL + 'api/petType';
    private breedTypes = SERVER_URL + 'api/petBreed/';
    private dateHouse = SERVER_URL + 'api/services/calender/';


    getSubCategories(): Observable<any> {
        return this.http.get(this.petsCategories)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }


    getPets(): Observable<any> {
        return this.http.get(this.allPets)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    getPetsTypes(): Observable<any> {
        return this.http.get(this.petTypes)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    getPetsBreed(id: string): Observable<any> {
        return this.http.get(this.breedTypes + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }
    getServiceCalendar(id: string): Observable<any> {
        // this.ServiceId=id;
        // console.log(this.ServiceId);
        return this.http.get(this.dateHouse + id)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error.json() || 'Server error'));
    }

}