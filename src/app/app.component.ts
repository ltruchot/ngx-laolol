// ng dependencies
import { Component, OnInit } from '@angular/core';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';

// npm dependencies
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/filter';

// custom services
import { LanguageService } from './shared/services/language.service';
import { ThemeService } from './shared/services/theme.service';
import { UserService } from './shared/services/user.service';
import { StorageService } from './shared/services/storage.service';
import { ApiService } from './shared/services/api.service';
import { ItemService } from './shared/services/item.service';

// custome models
// import { ReadHttpError } from './shared/models/error.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  cpntData = {
    availableLanguages: null,
    lang: null,
    user: null,
    theme: null,
    loadingRoute: true,
    currentVersion: 'Version 1.0.0'
  };
  constructor (private languageService: LanguageService,
    private router: Router,
    private userService: UserService,
    private itemService: ItemService,
    private themeService: ThemeService,
    private storageService: StorageService,
    private apiService: ApiService) {
  }

  changeCurrentLanguage (code) {
    this.languageService.chooseTranslation(code);
  }

  changeLearningLanguage (code) {
    this.languageService.chooseLearningLang(code);
  }

  ngOnInit () {

    // manage loading states
    this.cpntData.theme =  this.themeService.data;
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });

    // clear store if it's a new app version
    const appVersion = this.storageService.getItem('appVersion');
    if (appVersion !== this.cpntData.currentVersion) {
      this.storageService.clear();
      this.storageService.setItem('appVersion', this.cpntData.currentVersion);
    }
    const itemsVersion = this.storageService.getItem('itemsVersion');
    this.apiService.getResources('api/version').catch(error => {
      return Observable.throw(new Error());
    }).subscribe((version: any) => {
      if (itemsVersion !== version.current) {
        this.itemService.resetItems();
        this.themeService.resetThemes();
        this.storageService.setItem('itemsVersion', version.current);
      }
      this.itemService.initialize();
      this.themeService.initialize();
    }, err => {
      console.error('updateVersion ERROR:', err);
    });


    // clear item store if it's a new items version
    this.languageService.initializeLanguages();

    // init available data
    this.cpntData.availableLanguages = this.languageService.AVAILABLE_LANG;
    this.cpntData.lang = this.languageService.data;
    this.cpntData.user = this.userService.data;

  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
        this.cpntData.loadingRoute = true;
    }
    if (event instanceof NavigationEnd) {
        this.cpntData.loadingRoute = false;
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
        this.cpntData.loadingRoute = false;
    }
    if (event instanceof NavigationError) {
        this.cpntData.loadingRoute = false;
    }
  }
}
