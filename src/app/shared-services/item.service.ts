// ng dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// npm dependencies
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// custom services
import { ApiService } from './api.service';
import { UserService } from './user.service';

// custom models
import { HttpError, ReadHttpError, CreateHttpError, ManagedCodeErrors } from '../shared-interfaces/error.interfaces';
import { IItem } from '../shared-interfaces/item.models';

@Injectable()
export class ItemService {
  create$: Observable<any>;
  read$: Observable<any>;
  update$: Observable<void>;
  delete$: Observable<void>;
  error$: Observable<HttpError>;

  protected createSubject: Subject<any>;
  protected readSubject: Subject<any>;
  protected updateSubject: Subject<void>;
  protected deleteSubject: Subject<void>;
  protected errorSubject: Subject<HttpError>;
  private SERVER_URL = 'http://localhost:3000/'; // 'http://laolol.com/';
  private basicCodeErrors: ManagedCodeErrors;

  constructor (private http: Http, private apiService: ApiService, private userService: UserService)  {
    this.createSubject = new Subject();
    this.create$ = this.createSubject.asObservable();
    this.readSubject = new Subject();
    this.read$ = this.readSubject.asObservable();
    this.errorSubject = new Subject();
    this.error$ = this.errorSubject.asObservable();
    this.basicCodeErrors = this.getBasicCodeErrors();
  }

  getBasicCodeErrors (): ManagedCodeErrors  {
    return {
      '401': () => {
        this.userService.logout();
      }
    };
  }

  create (words: Array<IItem>): void {
    const url = 'api/words';
    this.apiService.postResources(url, words, true)
      .catch(error => {
        return Observable.throw(new CreateHttpError(error, url, this.basicCodeErrors));
      })
      .subscribe(
        data => this.readSubject.next(data),
        readHttpError => this.errorSubject.next(readHttpError)
      );
  }

  read (): void {
    let url = this.SERVER_URL + 'api/words';
    this.http.get(url)
      .map(res => res.json())
      .catch(error => {
        return Observable.throw(new ReadHttpError(error, url, this.basicCodeErrors));
      })
      .subscribe(
        data => this.readSubject.next(data),
        readHttpError => this.errorSubject.next(readHttpError)
      );
  }
}
