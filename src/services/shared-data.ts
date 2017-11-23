import { Injectable } from '@angular/core';

@Injectable()
export class ShareDataService {

    private dogServiceName: string;
    private providerId: string;
    private state: string;

    constructor() { }

    setDogServiceName(data): void {
        this.dogServiceName = data;
    }
    getDogServiceName(): string {
        return this.dogServiceName;
    }


    setProviderId(data): void {
        this.providerId = data;
    }
    getProviderId(): string {
        return this.providerId;
    }


    setPreviousState(data) {
        this.state = data;
    }
    getPreviousState(): string {
        return this.state;
    }

}