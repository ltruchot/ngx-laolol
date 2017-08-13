// ng dependencies
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';

// npm dependencies
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

// custom services
import { ApiService } from './api.service';
import { UserService } from './user.service';

// custom models
import {
  HttpError,
  ReadHttpError,
  CreateHttpError,
  DeleteHttpError,
  ManagedCodeErrors,
} from '../shared-models/error.models';
import { Item, IItemServiceData } from '../shared-models/item.models';

@Injectable()
export class ItemService {
  create$: Observable<any>;
  read$: Observable<any>;
  update$: Observable<void>;
  delete$: Observable<any>;
  error$: Observable<HttpError>;

  public data: IItemServiceData = {
    current: new Item(),
    all: []
  };
  protected createSubject: Subject<any>;
  protected readSubject: Subject<any>;
  protected updateSubject: Subject<void>;
  protected deleteSubject: Subject<any>;
  protected errorSubject: Subject<HttpError>;
  private basicUrl = 'api/words';
  private basicCodeErrors: ManagedCodeErrors;

  constructor (private apiService: ApiService, private userService: UserService)  {
    // create
    this.createSubject = new Subject();
    this.create$ = this.createSubject.asObservable();

    // read
    this.readSubject = new Subject();
    this.read$ = this.readSubject.asObservable();

    // delete
    this.deleteSubject = new Subject();
    this.delete$ = this.deleteSubject.asObservable();

    // errors
    this.errorSubject = new Subject();
    this.error$ = this.errorSubject.asObservable();
    this.basicCodeErrors = this.getBasicCodeErrors();
    console.log('item', this.data.current);
  }

  getBasicCodeErrors (): ManagedCodeErrors  {
    return {
      '400': (): string => {
        return 'Items format is invalid.';
      },
      '401': (): string => {
        this.userService.logout();
        return 'User authentification failed. Please, try to reconnect.';
      },
      '500': (): string => {
        return 'Server is probably down.';
      }
    };
  }

  create (words: Array<Item>): void {
    this.apiService.postResources(this.basicUrl, words, true).catch(error => {
      return Observable.throw(new CreateHttpError(error, this.basicUrl, this.basicCodeErrors));
    }).subscribe(data => {
      this.data.all.push(...data);
      return this.createSubject.next(data);
    }, createHttpError => {
      return this.errorSubject.next(createHttpError);
    });
  }

  read (): void {
    this.apiService.getResources(this.basicUrl).catch(error => {
      return Observable.throw(new ReadHttpError(error, this.basicUrl, this.basicCodeErrors));
    }).subscribe(data => {
      this.data.all.push(...data);
      return this.readSubject.next(data);
    }, readHttpError => {
      return this.errorSubject.next(readHttpError);
    });
  }

  delete (id: string): void {
    this.apiService.deleteResources(this.basicUrl + '/' + id, true).catch(error => {
      return Observable.throw(new DeleteHttpError(error, this.basicUrl, this.basicCodeErrors));
    }).subscribe(data => {
      this.data.all.splice(this.data.all.findIndex(item => item._id === id), 1);
      return this.deleteSubject.next(data);
    }, deleteHttpError => {
      return this.errorSubject.next(deleteHttpError);
    });
  }
}
