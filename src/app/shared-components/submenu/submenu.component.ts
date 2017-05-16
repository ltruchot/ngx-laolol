// ng dependencies
import { Component, OnInit } from '@angular/core';

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
    availableTheme: null
  };
  constructor (private themeService: ThemeService, private languageService: LanguageService) { }

  ngOnInit () {
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
    this.cpntData.availableTheme = this.themeService.AVAILABLE_THEMES;
  }

  changeLearningLang (code: string) {
    this.languageService.chooseLearningLang(code);
  }
  changeLearningTheme(index: number) {
    this.themeService.changeLearningTheme(index);
  }
}
