// ng dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// custom interfaces
import { ThemeItem } from './../shared-interfaces/theme.interfaces';

@Injectable()
export class ThemeService {
  AVAILABLE_THEME = [
    { code: 'vowels', trad: 'theme.vowels' },
    { code: 'consonants', trad: 'theme.consonants' },
    // { code: 'animals', trad: 'theme.animals' },
    // { code: 'plants', trad: 'theme.plants' },
    { code: 'days', trad: 'theme.days' },
    { code: 'family', trad: 'theme.family' }
  ];
  data = {
    learningTheme: 0,
    karaoke: false
  };
  constructor (private http: Http) { }

  getTheme (index: number) {
    return this.http.request(`assets/themes/${this.AVAILABLE_THEME[index].code}.json`).map(res => {
      const parsedRes: Array<ThemeItem> = res.json();
      if (parsedRes && parsedRes.length && parsedRes.length >= 4) {
        return parsedRes;
      } else {
        throw new Error(`/themes/${this.AVAILABLE_THEME[index].code}.json wasn't parsed correctly.
          Check if fils exists ans is correctly formed and with at least 7 items`);
      }
    });
  }

  getLearningTheme () {
     return this.getTheme(this.data.learningTheme);
  }
}
