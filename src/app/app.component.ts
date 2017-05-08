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
import { LanguageService } from './shared-services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  cpntData = {
    availableLanguages: null,
    lang: null,
    loadingRoute: true
  };
  constructor (private languageService: LanguageService, private router: Router) {
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  changeLanguage (code) {
    this.languageService.chooseTranslation(code);
  }
  ngOnInit () {
    this.cpntData.availableLanguages = this.languageService.AVAILABLE_LANG;
    this.cpntData.lang = this.languageService.data;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
        this.cpntData.loadingRoute = true;
    }
    if (event instanceof NavigationEnd) {
        this.cpntData.loadingRoute = false;
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
