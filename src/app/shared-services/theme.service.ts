// ng dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// npm dependencies
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

// custom services
import { StorageService } from './storage.service';
import { ApiService } from './api.service';

// custom interfaces
import { ThemeItem } from './../shared-interfaces/theme.interfaces';

@Injectable()
export class ThemeService {
  private currenThemeSource = new Subject<any>();
  currentTheme$ = this.currenThemeSource.asObservable();
  AVAILABLE_THEME = [
    {
      code: 'vowels',
      trad: 'theme.vowels',
      noKaraoke: true,
      en: 'Vowels',
      fr: 'Les voyelles',
      lo: 'ສະຫຼະ'
    },
    {
      code: 'consonants',
      trad: 'theme.consonants',
      en: 'Consonants',
      fr: 'Les consonnes',
      lo: 'ພະຍັນຊະນະ'
    },
    {
      code: 'animals',
      trad: 'theme.animals',
      en: 'Animals',
      fr: 'Les animaux',
      lo: 'ສັດ'
    },
    // { code: 'plants', trad: 'theme.plants' },
    {
      code: 'days',
      trad: 'theme.days',
      en: 'Week days',
      fr: 'Les jours de la semaine',
      lo: 'ວັນ'
    },
    {
      code: 'family',
      trad: 'theme.family',
      en: 'Family',
      fr: 'La famille',
      lo: 'ຄອບຄົວ'
    }
  ];
  data = {
    learningThemeIdx: 0,
    learningTheme: null,
    karaoke: false
  };
  constructor (private http: Http,
    private storage: StorageService,
    private apiService: ApiService) {
    this.data.learningThemeIdx = +this.storage.getItem('currentLearningThemeIdx') || 0;
    this.data.learningTheme = this.AVAILABLE_THEME[this.data.learningThemeIdx];
  }
  getCurrentTheme () {
    return this.apiService
      .getData(`assets/themes/${this.data.learningTheme.code}.json`)
      .map((res: Response): any => {
        return res.json();
      })
      .subscribe((parsedRes: Array<ThemeItem>) => {
      if (parsedRes && parsedRes.length && parsedRes.length >= 4) {
        this.currenThemeSource.next(parsedRes);
      } else {
        throw new Error(`/themes/${this.data.learningTheme.code}.json wasn't parsed correctly.
          Check if fils exists ans is correctly formed and with at least 7 items`);
      }
    });
  }

  changeLearningTheme (idx: number) {
    if ((!isNaN(idx)) && (idx !== this.data.learningThemeIdx)) {
      this.data.learningThemeIdx = idx;
      this.data.learningTheme = this.AVAILABLE_THEME[idx];
      this.storage.setItem('currentLearningThemeIdx', idx);
      this.getCurrentTheme();
    }
  }
}
