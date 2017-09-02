// ng dependencies
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';

// npm dependencies
import { ReplaySubject } from 'rxjs/ReplaySubject';
// import { Observable } from 'rxjs/Observable';

// custom services
import { StorageService } from './storage.service';

@Injectable()
export class ApiService {
  private SERVER_URL = 'http://localhost:3000/'; // 'http://laolol.com/';
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

  getBasicOptions (auth: boolean, search?: URLSearchParams) {
    const headers = new Headers({});
    if (auth) { this.addAuth(headers); }
    const options = new RequestOptions({ headers: headers });
    if (search) {
      options.search = search;
    }
    return options;
  }

  getResources (url: string, auth?: boolean, search?: URLSearchParams)  {
    url = this.SERVER_URL + url;
    return this.http.get(url, this.getBasicOptions(auth, search)).map(res => res.json());
  }

  deleteResources (url: string, auth?: boolean)  {
    url = this.SERVER_URL + url;
    return this.http.delete(url, this.getBasicOptions(auth)).map(res => res.json());
  }

  postResources (url: string, data: any, auth?: boolean) {
    let body: any;
    let contentType = 'application/json';
    if (data instanceof Array) {
      body = JSON.stringify(data);
    } else {
      contentType = 'application/x-www-form-urlencoded';
      body = new URLSearchParams();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          body.set(key, data[key]);
        }
      }
    }

    const headers = new Headers({
      'Content-Type': contentType,
    });
    if (auth) { this.addAuth(headers); }
    const options = new RequestOptions({headers: headers});
    return this.http.post(this.SERVER_URL + url, body.toString(), options).map(res => res.json());
  }

  addAuth (headers: Headers) {
    const token = this.storageService.getItem('authToken');
    headers.append('Authorization', token);
  }
}
