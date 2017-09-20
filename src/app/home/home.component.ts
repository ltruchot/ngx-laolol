// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// custom dependencies
import { LanguageService } from './../shared/services/language.service';
import { ThemeService } from './../shared/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cpntData = {
    lang: null,
    theme: null
  };
  constructor(public router: Router,
    private languageService: LanguageService,
    private themeService: ThemeService) { }

  ngOnInit() {
    this.cpntData.lang = this.languageService.data;
    this.cpntData.theme = this.themeService.data;
  }

  changeLearningLang (code: string) {
    this.languageService.data.learningLang = code;
  }
}
