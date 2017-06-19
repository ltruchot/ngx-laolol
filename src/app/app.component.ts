// ng dependencies
import { Component, OnInit, ViewChild } from '@angular/core';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
// import {
//   FormBuilder,
//   FormGroup,
//   Validators
// } from '@angular/forms';

// custom services
import { LanguageService } from './shared-services/language.service';
import { ThemeService } from './shared-services/theme.service';
// import { UserService } from './shared-services/user.service';
import { StorageService } from './shared-services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  // @ViewChild('loginModal') loginModal;
  // loginForm: FormGroup;
  cpntData = {
    availableLanguages: null,
    lang: null,
    user: null,
    theme: null,
    loadingRoute: true,
    currentVersion: 'Alpha version 0.0.23'
  };
  constructor (private languageService: LanguageService,
    public router: Router,
    // private userService: UserService,
    // private formBuilder: FormBuilder,
    private themeService: ThemeService,
    private storageService: StorageService) {
    this.cpntData.theme =  this.themeService.data;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }
  changeLanguage (code) {
    this.languageService.chooseTranslation(code);
  }
  ngOnInit () {
    // clear store if it's a new version
    const version = this.storageService.getItem('version');
    if (version !== this.cpntData.currentVersion) {
      this.storageService.clear();
      this.storageService.setItem('version', this.cpntData.currentVersion);
    }
    this.languageService.initializeLanguages();

    // init login form
    // this.loginForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   password: ['', Validators.required]
    // });

    // init available data
    this.cpntData.availableLanguages = this.languageService.AVAILABLE_LANG;
    this.cpntData.lang = this.languageService.data;
    // this.cpntData.user = this.userService.data;

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

  // login ({ value, valid }) {
  //   if (valid) {
  //     this.userService.login(value, () => {
  //       this.loginModal.close();
  //     });
  //   }
  // }

  // logout () {
  //   this.userService.logout(() => {
  //     this.loginModal.close();
  //   });
  // }
}
