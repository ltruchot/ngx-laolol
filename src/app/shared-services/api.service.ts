// ng dependencies
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

// npm dependencies
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

// custom services
import { StorageService } from './storage.service';

@Injectable()
export class ApiService {
  private SERVER_URL = 'http://localhost:3000/';
  private cachedObs = {};
  constructor(private http: Http, private storageService: StorageService) { }
  getData(resource, forceRefresh?: boolean) {

    // if no cache space exists, create it with new Subject
    if (typeof this.cachedObs[resource] === 'undefined') {
      this.cachedObs[resource] = new ReplaySubject(1);
    }

    // get Subject in cache
    let dataObs$ = this.cachedObs[resource];

    // If the Subject was NOT subscribed before OR if forceRefresh is requested
    if (!dataObs$.observers.length || forceRefresh) {
      this.http.request(resource).subscribe(
        data => dataObs$.next(data),
        error => {
            dataObs$.error(error);

            // Recreate the Observable as after Error we cannot emit data anymore
            dataObs$ = new ReplaySubject(1);
        }
      );
    }
    return dataObs$;
  }
  post (url, data) {
    const body = new URLSearchParams();
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        body.set(key, data[key]);
      }
    }

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.storageService.getItem('AuthToken')
    });
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.SERVER_URL + url, body.toString(), options).map(res => res.json());
  }
}
