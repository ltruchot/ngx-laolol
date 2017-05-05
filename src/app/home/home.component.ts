import { Component, OnInit } from '@angular/core';
import { LanguageService } from './../shared-services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  cpntData = {
    lang: null
  };
  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.cpntData.lang = this.languageService.data;
  }

  changeLearningLang (code: string) {
    this.languageService.data.learningLang = code;
  }

}
