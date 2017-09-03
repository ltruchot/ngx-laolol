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
import 'rxjs/add/operator/filter';

// custom services
import { LanguageService } from './shared-services/language.service';
import { ThemeService } from './shared-services/theme.service';
import { UserService } from './shared-services/user.service';
import { StorageService } from './shared-services/storage.service';
// import { ItemService } from './shared-services/item.service';

// custome models
// import { ReadHttpError } from './shared-models/error.models';

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
    currentVersion: 'Beta version 0.2.0'
  };
  constructor (private languageService: LanguageService,
    private router: Router,
    private userService: UserService,
    // private itemService: ItemService,
    private themeService: ThemeService,
    private storageService: StorageService) {
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

    // clear store if it's a new version
    const version = this.storageService.getItem('version');
    if (version !== this.cpntData.currentVersion) {
      this.storageService.clear();
      this.storageService.setItem('version', this.cpntData.currentVersion);
    }
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
