// ng dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// custom interfaces
import { ThemeItem } from './../shared-interfaces/theme.interfaces';

@Injectable()
export class ThemeService {
  DEFAULT_THEME = 'vowels';
  AVAILABLE_THEME = [
    { code: 'vowels', trad: 'theme.vowels' },
    { code: 'consonants', trad: 'theme.consonants' },
    // { code: 'animals', trad: 'theme.animals' },
    // { code: 'plants', trad: 'theme.plants' },
    { code: 'days', trad: 'theme.days' },
    { code: 'family', trad: 'theme.family' }
  ];
  data = {
    learningTheme: 'vowels',
    karaoke: false
  };
  constructor (private http: Http) { }
    getTheme (fileName: string) {
    return this.http.request(`assets/themes/${fileName}.json`).map(res => {
      const parsedRes: Array<ThemeItem> = res.json();
      if (parsedRes && parsedRes.length && parsedRes.length >= 4) {
        return parsedRes;
      } else {
        throw new Error(`/themes/${fileName}.json wasn't parsed correctly.
          Check if fils exists ans is correctly formed and with at least 7 items`);
      }
    });
  }
  getLearningTheme () {
     return this.getTheme(this.data.learningTheme);
  }
}
