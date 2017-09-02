// ng dependencies
import { Component, OnInit } from '@angular/core';

// custom services
import { ThemeService } from './../shared-services/theme.service';
import { LanguageService } from './../shared-services/language.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html'
})
export class ExamsComponent implements OnInit {
  cpntData = {
    lang: null,
    availableLang: null,
    theme: null
  };
  constructor (private themeService: ThemeService, private languageService: LanguageService) { }

  ngOnInit () {
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
  }
}
