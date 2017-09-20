// ng dependencies
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

// npm dependencies
import { Subscription } from 'rxjs/Subscription';

// custom services
import { ThemeService } from './../shared/services/theme.service';
import { LanguageService } from './../shared/services/language.service';

// custome models
import { Theme } from './../shared/models/theme.models';

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
    vowels: {
      fr: /[aeiouyAEIOUYàèìòùÀÈÌÒÙáéíóúâêîôûäëïöüÿÄËÏÖÜŸÆæœ]/,
      en: /[aeiou]/
    }
  };

  constructor(private themeService: ThemeService,
    private languageService: LanguageService,
    private route: ActivatedRoute,
    public router: Router) {
    this.themeSubscription = this.themeService.currentTheme$.subscribe(data => {
      this.resetTheme(data);
    });
  }

  /*
  A getter to recalculate if the lao special font is needed
 */
  get isLaoLanguage () {
    return this.cpntData.lang && this.cpntData.lang.currentLang === 'lo';
  }

  ngOnInit () {
    this.cpntData.availableLang = this.languageService.AVAILABLE_LANG;
    this.cpntData.lang =  this.languageService.data;
    this.cpntData.theme =  this.themeService.data;
    this.route.params.subscribe(params => {
      if (!this.cpntData.theme.all.length) {
        const sub = this.themeService.read$.subscribe(themes => {
          sub.unsubscribe();
          this.checkRouteParams(params.uid, themes);
        })
      } else {
        this.checkRouteParams(params.uid, this.cpntData.theme.all);
      }
    });
  }

   checkRouteParams (uid: string, allThemes: Array<Theme>) {
    if (uid && this.cpntData.theme.all.find(item => item.uid === uid)) {
      this.themeService.changeLearningTheme(uid);
    } else {
      this.router.navigate(['404']);
    }
  }

  resetTheme (data) {
    this.cpntData.items.length = 0;
    this.cpntData.items.push(...data);
    this.cpntData.items.forEach((item) => {
      this.cpntData.availableLang.forEach((avLang) => {
        const sound = item[avLang.code].snd;
        if (sound) {
          item[avLang.code].audio = new Audio();
          item[avLang.code].audio.src = '/assets/medias/' + sound;
          item[avLang.code].audioLoaded = false;
          item[avLang.code].audio.addEventListener('canplaythrough', function audioLoad () {
            item[avLang.code].audioLoaded = true;
            this.removeEventListener('canplaythrough', audioLoad);
          });
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
