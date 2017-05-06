// ng dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';

// npm dependencies
import { Subscription } from 'rxjs/Subscription';

// custom interfaces
import { GameboardCpntData } from './gameboard.interfaces';
import { ThemeItem } from './../shared-interfaces/theme.interfaces';

// custom services
import { ThemeService } from './../shared-services/theme.service';
import { LanguageService } from './../shared-services/language.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html'
})
export class GameboardComponent implements OnInit, OnDestroy {
  themeSubscription: Subscription;
  cpntData: GameboardCpntData = {
    winItemIdx: null,
    clickedIdx: null,
    currentQuestionTimer: 0,
    items: [],
    lang: null,
    availableLang: null,
    theme: null,
    availableTheme: null
  };
  allItems: Array<ThemeItem> = [];
  questionTimer: number = null;
  QUESTION_TIMER_DURATION = 7;
  constructor (private themeService: ThemeService, private languageService: LanguageService) {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(data => {
      this.resetTheme(data);
    });
  }

  ngOnInit () {
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.theme =  this.themeService.data;
    this.cpntData.availableTheme = this.themeService.AVAILABLE_THEME;
    this.themeService.getCurrentTheme().subscribe();
  }

  changeDisplayedItems () {
    this.launchQuestionTimer();
    const ITEM_DISPLAYED_NBR = 4;
    const items = this.allItems;
    for (let i = 0; i < ITEM_DISPLAYED_NBR; i++) {
      const randomItemIdx = Math.floor(Math.random() * items.length);
      this.cpntData.items.push(items[randomItemIdx]);
      this.allItems.splice(randomItemIdx, 1);
    }
    this.cpntData.winItemIdx = Math.floor(Math.random() * ITEM_DISPLAYED_NBR);
  }

  checkAnswer (index) {
    this.cpntData.clickedIdx = index;
    clearInterval(this.questionTimer);
  }

  nextQuestion () {
    this.cpntData.clickedIdx = null;
    this.cpntData.winItemIdx = null;
    this.allItems.push(...this.cpntData.items);
    this.cpntData.items.length = 0;
    this.changeDisplayedItems();
  }

  resetTheme (data) {
    this.cpntData.clickedIdx = null;
    this.cpntData.winItemIdx = null;
    this.allItems.length = 0;
    this.allItems.push(...data);
    this.cpntData.items.length = 0;
    this.changeDisplayedItems();
  }

  launchQuestionTimer () {
    // console.log('gameboard.component::launchQuestionTimer');
    this.resetQuestionTimer();
    let ctr = 0;
    window.setTimeout(() => {
       this.questionTimer = window.setInterval(() => {
        ctr++;
        this.cpntData.currentQuestionTimer = Math.ceil((ctr / this.QUESTION_TIMER_DURATION) * 10);

        // max reached?
        if (ctr === (this.QUESTION_TIMER_DURATION * 10) + 3) {
          clearInterval(this.questionTimer);
          this.cpntData.clickedIdx = -1;
        }
      }, 100);
    }, 200);
  }

  resetQuestionTimer () {
    this.cpntData.currentQuestionTimer = 0;
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.themeSubscription.unsubscribe();
  }
}
