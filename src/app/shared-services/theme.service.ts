// ng dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// custom services
import { StorageService } from './storage.service';

// custom interfaces
import { ThemeItem } from './../shared-interfaces/theme.interfaces';

@Injectable()
export class ThemeService {
  AVAILABLE_THEME = [
    { code: 'vowels', trad: 'theme.vowels', noKaraoke: true },
    { code: 'consonants', trad: 'theme.consonants', noKaraoke: true },
    { code: 'animals', trad: 'theme.animals'},
    // { code: 'plants', trad: 'theme.plants' },
    { code: 'days', trad: 'theme.days' },
    { code: 'family', trad: 'theme.family' }
  ];
  data = {
    learningThemeIdx: 0,
    learningTheme: null,
    karaoke: false
  };
  constructor (private http: Http, private storage: StorageService) {
    const learningThemeIdx: number = this.storage.getItem('currentLearningThemeIdx') || 0;
    this.changeLearningTheme(learningThemeIdx);
  }
  getCurrentTheme () {
    return this.http.request(`assets/themes/${this.data.learningTheme.code}.json`).map(res => {
      const parsedRes: Array<ThemeItem> = res.json();
      if (parsedRes && parsedRes.length && parsedRes.length >= 4) {
        return parsedRes;
      } else {
        throw new Error(`/themes/${this.data.learningTheme.code}.json wasn't parsed correctly.
          Check if fils exists ans is correctly formed and with at least 7 items`);
      }
    });
  }

  changeLearningTheme (idx: number) {
    this.data.learningThemeIdx = idx;
    this.data.learningTheme = this.AVAILABLE_THEME[idx];
    this.storage.setItem('currentLearningThemeIdx', idx);
  }
}
