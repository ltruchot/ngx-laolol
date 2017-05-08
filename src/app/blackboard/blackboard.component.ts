// ng dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';

// npm dependencies
import { Subscription } from 'rxjs/Subscription';

// custom services
import { ThemeService } from './../shared-services/theme.service';
import { LanguageService } from './../shared-services/language.service';

@Component({
  selector: 'app-blackboard',
  templateUrl: './blackboard.component.html'
})
export class BlackboardComponent implements OnInit, OnDestroy {
  themeSubscription: Subscription;
  cpntData = {
    items: [],
    lang: null,
    availableLang: null,
    theme: null,
    availableTheme: null,
    frVowels: /[aeiouyAEIOUYàèìòùÀÈÌÒÙáéíóúâêîôûäëïöüÿÄËÏÖÜŸÆæœ]/
  };

  constructor(private themeService: ThemeService, private languageService: LanguageService) {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(data => {
      this.resetTheme(data);
    });
    let accentedCharacters = "";
  }

  ngOnInit () {
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
    this.cpntData.availableTheme = this.themeService.AVAILABLE_THEME;
    this.themeService.getCurrentTheme() //.subscribe();
  }

  resetTheme (data) {
    this.cpntData.items.length = 0;
    this.cpntData.items.push(...data);
  }

  changeLearningLang (code: string) {
    this.languageService.chooseLearningLang(code);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.themeSubscription.unsubscribe();
  }
}
