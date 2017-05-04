import { Component, OnInit } from '@angular/core';

// custom services
import { ThemeService } from './../shared-services/theme.service';
import { LanguageService } from './../shared-services/language.service';

@Component({
  selector: 'app-blackboard',
  templateUrl: './blackboard.component.html'
})
export class BlackboardComponent implements OnInit {

  cpntData = {
    items: [],
    lang: null,
    availableLang: null,
    theme: null,
    availableTheme: null
  };

  constructor(private themeService: ThemeService, private languageService: LanguageService) { }

  ngOnInit () {
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
    this.cpntData.availableTheme = this.themeService.AVAILABLE_THEME;
    this.themeService.getLearningTheme().subscribe(data => {
      this.resetTheme(data);
    });
  }
  resetTheme (data) {
    this.cpntData.items.length = 0;
    this.cpntData.items.push(...data);
  }

  changeLearningLang (code: string) {
    this.languageService.data.learningLang = code;
  }
  changeLearningTheme(index: number) {
    this.themeService.data.learningTheme = index;
    this.themeService.getLearningTheme().subscribe(data => {
      this.resetTheme(data);
    });
  }
}
