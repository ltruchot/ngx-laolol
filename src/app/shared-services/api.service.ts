// ng dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// npm dependencies
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
  private cachedObs = {};
  constructor(private http: Http) { }
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
}
