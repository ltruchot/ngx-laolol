// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// custom services
import { ThemeService } from './../../shared-services/theme.service';
import { LanguageService } from './../../shared-services/language.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html'
})
export class SubmenuComponent implements OnInit {
  cpntData = {
    lang: null,
    availableLang: null,
    theme: null,
    availableTheme: null,
    currentUrl: ''
  };
  constructor (private themeService: ThemeService,
    private languageService: LanguageService,
    public router: Router) {}

  ngOnInit () {
    this.cpntData.currentUrl = this.router.url.split('/')[1];
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
    this.cpntData.availableTheme = this.themeService.AVAILABLE_THEMES;
  }

  changeLearningLang (code: string) {
    this.languageService.chooseLearningLang(code);
  }

  changeLearningTheme(uid: string) {
    this.router.parseUrl(this.router.url);
    if (this.cpntData.currentUrl) {
      this.router.navigate([this.cpntData.currentUrl + '/' + uid]);
    }
  }

  toggleKaraoke () {
    this.themeService.toggleKaraoke();
  }
}
