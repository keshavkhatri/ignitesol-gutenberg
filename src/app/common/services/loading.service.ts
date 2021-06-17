import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    public loading = false;

    constructor(
    ) { }

    loadingStatus() {
       return this.loading;
    }

    showLoading() {
        this.loading = true;
    }

    hideLoading() {
        this.loading = false;
    }
}
