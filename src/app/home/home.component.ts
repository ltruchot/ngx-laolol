import { Component, OnInit } from '@angular/core';
import { LanguageService } from './../shared-services/language.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
  }

  goGameboard (code: string) {
  	this.languageService.data.learningLang = code;
  }

}
