import { Component, OnInit } from '@angular/core';
import { LanguageService } from './shared-services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  cpntData = {
    availableLanguages: null
  };
  constructor (private languageService: LanguageService) {

  }
  changeLanguage (code) {
    this.languageService.chooseTranslation(code);
  }
  ngOnInit () {
    this.cpntData.availableLanguages = this.languageService.AVAILABLE_LANG;
  }
}
