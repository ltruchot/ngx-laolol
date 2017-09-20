// ng dependencies
import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';

// npm dependencies
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

// custom services
import { ApiService } from './api.service';
import { UserService } from './user.service';
import { StorageService } from './storage.service';
import { ItemService } from './item.service';

// custom models
import {
  CreateHttpError,
  UpdateHttpError,
  DeleteHttpError,
  HttpError,
  ManagedCodeErrors,
  ReadHttpError
} from '../models/error.models';
import { IThemeServiceData, Theme } from '../models/theme.models';
import { Item, IItemsResponse } from './../models/item.models';

@Injectable()
export class ThemeService {
  create$: Observable<any>;
  read$: Observable<any>;
  update$: Observable<void>;
  delete$: Observable<any>;
  error$: Observable<HttpError>;
  private currenThemeSource = new Subject<any>();
  currentTheme$ = this.currenThemeSource.asObservable();
  public data: IThemeServiceData = {
    current: new Theme(),
    all: [],
    learningUid: '',
    learning: null,
    displayKaraoke: true,
    isReversed: false,
    isMoreInfos: false,
    isCurrentLoading: false,
    learningLevel: 0,
    levels: [],
    items: []
  };
  private defaultLearningUid = 'animals';
  protected createSubject: Subject<any>;
  protected readSubject: Subject<any>;
  protected updateSubject: Subject<any>;
  protected deleteSubject: Subject<any>;
  protected errorSubject: Subject<HttpError>;
  private basicUrl = 'api/themes';
  private basicCodeErrors: ManagedCodeErrors;

  constructor (private apiService: ApiService, private userService: UserService, private storage: StorageService, private itemService: ItemService)  {

    // create
    this.createSubject = new Subject();
    this.create$ = this.createSubject.asObservable();

    // read
    this.readSubject = new Subject();
    this.read$ = this.readSubject.asObservable();

     // update
    this.updateSubject = new Subject();
    this.update$ = this.updateSubject.asObservable();

    // delete
    this.deleteSubject = new Subject();
    this.delete$ = this.deleteSubject.asObservable();

    // errors
    this.errorSubject = new Subject();
    this.error$ = this.errorSubject.asObservable();
    this.basicCodeErrors = this.getBasicCodeErrors();

    const currentThemeUid = this.storage.getItem('currentLearningThemeUid');
    const isKaraokeActivated = this.storage.getItem('isKaraokeActivated');
    const isMoreInfosActivated = this.storage.getItem('isMoreInfosActivated');

    this.data.learningUid = currentThemeUid ? currentThemeUid : this.defaultLearningUid;
    this.data.displayKaraoke = typeof isKaraokeActivated !== 'undefined' ? isKaraokeActivated : true;
    this.data.isMoreInfos = typeof isMoreInfosActivated !== 'undefined' ? isMoreInfosActivated : true;


  }

  initialize () {
    // subscrine to special themes items request, needed before theme request;
    const themeItemSub = this.itemService.read$.subscribe((res: IItemsResponse) => {
      if (res.theme === 'themes') {
        this.read();
        themeItemSub.unsubscribe();
      }
    });
    // launch loading themeItems & theme process
    this.itemService.read('themes');

    // subscribe to item to prepare management of individual theme loading in app
    this.itemService.read$.subscribe((res: IItemsResponse) => {
      // don't load the special theme "all" that contains every items
      if (res.theme !== 'all') {
        // all other cases
        const data = res.data;
        this.data.items.length = 0;
        if (data && data.length && data.length >= 4) {
          this.data.items.length = 0;
          this.data.items.push(...data);
          this.currenThemeSource.next(this.getCurrentLevel());
        } else {
          if (this.data.learning && this.data.learning.uid) {
            throw new Error(`Theme "${this.data.learning.uid}" wasn't loaded correctly.
            Check if theme exists ans is correctly populated with at least 4 items`);
          } else {
            throw new Error(`No valid learning found. Check db & request`);
          }
        }
        this.data.isCurrentLoading = false;
      }
    });
  }

  resetThemes () {
    console.log('theme.service::resetThemes');
    this.storage.removeItem('allThemes');
    this.storage.removeItem('loadedThemes');
  }

  checkLevels () {
    // console.log('submenu.component::checkLevels', this.data.learning);
    this.data.learningLevel = 0;
    const levels = this.data.learning && this.data.learning.levels;
    this.data.levels = levels ? Array.from(Array(levels + 1).keys()) : [];
  }

  toggleKaraoke () {
    this.data.displayKaraoke = !this.data.displayKaraoke;
    this.storage.setItem('isKaraokeActivated', this.data.displayKaraoke);
  }

  toggleMoreInfos () {
    this.data.isMoreInfos = !this.data.isMoreInfos;
    this.storage.setItem('isMoreInfosActivated', this.data.isMoreInfos);
  }

  getCurrentLevel () {
    // console.log('theme.services::getCurrentLevel', this.data.learningLevel, this.data.levels.length);
    let items: Array<Item>;
    if (this.data.learningLevel < this.data.levels.length - 1) {
      items = this.data.items.filter(item => {
        return item.lvl === this.data.learningLevel;
      });
    } else {
      items = this.data.items;
    }
    return items;
  }

  getCurrentTheme () {
    // console.log('theme.service::getCurrentTheme');
    this.data.isCurrentLoading = true;
    this.itemService.read(this.data.learningUid);
  }

  changeLearningTheme (uid: string) {
    // console.log('theme.service::changeLearningTheme', uid);
    if (uid !== this.data.learningUid) {
      this.data.learningUid = uid;
      this.data.learning = this.data.all.find(item => item.uid === uid);
      this.storage.setItem('currentLearningThemeUid', uid);
      this.checkLevels();
      this.getCurrentTheme();
    } else  {
      this.checkLevels();
      this.getCurrentTheme();
    }
    return !!this.data.learning;
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

  create (words: Array<Theme>): void {
    this.apiService.postResources(this.basicUrl, words, true).catch(error => {
      return Observable.throw(new CreateHttpError(error, this.basicUrl, this.basicCodeErrors));
    }).subscribe(data => {
      data.forEach(theme => {
        this.enhanceThemeWithLink(theme);
      });
      this.data.all.push(...data);
      this.storage.setItem('allThemes', this.data.all);
      return this.createSubject.next(data);
    }, createHttpError => {
      return this.errorSubject.next(createHttpError);
    });
  }

  modifyThemes (data: Theme) {
    let modifiedTheme = this.data.all.find(theme => theme._id === data._id);
    if (modifiedTheme) {
      modifiedTheme = data;
    }
  }

  update (themes: Array<Theme>): void {
    this.apiService.putResources(this.basicUrl + `/${themes[0]._id}`, themes[0], true).catch(error => {
      return Observable.throw(new UpdateHttpError(error, this.basicUrl, this.basicCodeErrors));
    }).subscribe((data: Theme) => {
      this.modifyThemes(data);
      this.storage.setItem('allThemes', this.data.all);
      return this.updateSubject.next(data);
    }, updateHttpError => {
      console.error('updateHttpError', updateHttpError.message);
      return this.errorSubject.next(updateHttpError);
    });
  }

  populateThemes (themes: Array<Theme>) {
    // console.log('theme.service::populateThemes', themes);
    themes.forEach(theme => {
      this.enhanceThemeWithLink(theme);
    });
    this.data.all.length = 0;
    this.data.all.push(...themes);
    this.data.learning = this.data.all.find(item => item.uid === this.data.learningUid);
    this.checkLevels();
    this.data.isCurrentLoading = false;
  }

  enhanceThemeWithLink (theme: Theme) {
   // console.log('theme.service::enhanceThemeWithLink', theme)
   const linkedItem = this.itemService.data.all.find(item => item.uid === theme.linkUid);
    if (linkedItem) {
      theme.link = linkedItem;
    } else {
      console.error(`Theme ${theme.uid} error: linked item ${theme.linkUid} not found.`);
    }
  }

  read (): void {
    // console.log('theme.service::read');
    this.data.isCurrentLoading = true;
    const allThemes = this.storage.getItem('allThemes');
    if (allThemes && allThemes.length) {
      this.populateThemes(allThemes);
      return this.readSubject.next(allThemes);
    } else {
      this.apiService.getResources(this.basicUrl).catch(error => {
        return Observable.throw(new ReadHttpError(error, this.basicUrl, this.basicCodeErrors));
      }).subscribe(res => {
        this.populateThemes(res);
        this.storage.setItem('allThemes', this.data.all);
        return this.readSubject.next(res);
      }, readHttpError => {
        this.data.isCurrentLoading = false;
        return this.errorSubject.next(readHttpError);
      });
    }
  }

  delete (id: string): void {
    console.log('theme.service::delete')
    this.apiService.deleteResources(this.basicUrl + '/' + id, true).catch(error => {
      return Observable.throw(new DeleteHttpError(error, this.basicUrl, this.basicCodeErrors));
    }).subscribe(data => {
      this.data.all.splice(this.data.all.findIndex(theme => theme._id === id), 1);
      this.storage.setItem('allThemes', this.data.all);
      return this.deleteSubject.next(data);
    }, deleteHttpError => {
      return this.errorSubject.next(deleteHttpError);
    });
  }
}
