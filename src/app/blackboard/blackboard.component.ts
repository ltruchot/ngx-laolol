// ng dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    vowels: {
      fr: /[aeiouyAEIOUYàèìòùÀÈÌÒÙáéíóúâêîôûäëïöüÿÄËÏÖÜŸÆæœ]/,
      en: /[aeiou]/
    }
  };

  constructor(private themeService: ThemeService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    private router: Router) {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(data => {
      this.resetTheme(data);
    });
  }

  ngOnInit () {
     this.route.params.subscribe(params => {
      if (params.uid) {
        if (this.themeService.changeLearningThemeByUid(params.uid)) {
            this.cpntData.lang =  this.languageService.data;
            this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
            this.cpntData.theme =  this.themeService.data;
            this.cpntData.availableTheme = this.themeService.AVAILABLE_THEMES;
            this.themeService.getCurrentTheme();
        } else {
          this.router.navigate(['404']);
        }
      } else {
        this.router.navigate(['404']);
      }
    });

  }

  resetTheme (data) {
    this.cpntData.items.length = 0;
    this.cpntData.items.push(...data);
    this.cpntData.items.forEach((item) => {
      this.cpntData.availableLang.forEach((avLang) => {
        const sound = item[avLang.code].sound;
        if (sound) {
          item[avLang.code].audio = new Audio();
          item[avLang.code].audio.src = '/assets/medias/' + sound;
          item[avLang.code].audio.load();
        }
      });
    });
  }

  changeLearningLang (code: string) {
    this.languageService.chooseLearningLang(code);
  }

  playsound(index: string) {
    const lang = this.cpntData.lang.learningLang;
    if (this.cpntData.items[index][lang].audio) {
      this.cpntData.items[index][lang].audio.play();
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.themeSubscription.unsubscribe();
  }
}
