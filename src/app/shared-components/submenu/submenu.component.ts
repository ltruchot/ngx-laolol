// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// npm dependencies
// import { Subscription } from 'rxjs/Subscription';

// custom services
import { ThemeService } from './../../shared-services/theme.service';
import { LanguageService } from './../../shared-services/language.service';

@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html'
})
export class SubmenuComponent implements OnInit {
  // themeSubscription: Subscription;
  cpntData = {
    lang: null,
    availableLang: null,
    theme: null,
    availableTheme: null,
    currentUrl: '',
    levels: []
  };
  constructor (private themeService: ThemeService,
    private languageService: LanguageService,
    public router: Router) {
    // this.themeSubscription = this.themeService.currentTheme$.subscribe(data => {
    // });
  }

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
  changeLearningLevel (lvl: number) {
    // console.log('submenu.component::changeLearningThemeLvl');
    this.cpntData.theme.learningLevel = lvl;
    this.themeService.getCurrentTheme();
  }
  toggleKaraoke () {
    this.themeService.toggleKaraoke();
  }
}
