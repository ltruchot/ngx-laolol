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
import { IThemeItem } from './../shared-interfaces/theme.interfaces';

@Injectable()
export class ThemeService {
  private currenThemeSource = new Subject<any>();
  currentTheme$ = this.currenThemeSource.asObservable();
  AVAILABLE_THEMES = [
    // {
    //   code: 'vowels',
    //   trad: 'theme.vowels',
    //   noKaraoke: true,
    //   en: 'Vowels',
    //   fr: 'Les voyelles',
    //   lo: 'ສະຫຼະ'
    // },
    // {
    //   code: 'consonants',
    //   trad: 'theme.consonants',
    //   en: 'Consonants',
    //   fr: 'Les consonnes',
    //   lo: 'ພະຍັນຊະນະ'
    // },
    {
      'uid': 'consonants',
      'trad': 'theme.consonants',
      'en': {
        'wrd': 'consonant',
        'kk': {}
      },
      'fr': {
        'wrd': 'consonne',
        'kk': {}
      },
      'lo': {
        'wrd': 'ພະຍັນຊະນະ',
        'kk': {}
      }
    },
    {
      'uid': 'animals',
      'trad': 'theme.animals',
      'en': {
        'wrd': 'animal',
        'kk': {}
      },
      'fr': {
        'wrd': 'animal',
        'kk': {},
        'meta': {
          'fr': {
            'isMale': true,
            'plural': 'animaux'
          }
        }
      },
      'lo': {
        'wrd': 'ສັດ',
        'kk': {
          'en': 'sad',
          'fr': 'sat'
        },
        'meta': {
          'classifier': 'ໂຕ',
          'cl_kk': {
            'fr': 'to:',
            'en': 'to:'
          }
        }
      }
    },
    {
      'uid': 'adj-with-contrary',
      'noPlural': true,
      'trad': 'theme.adjContrary',
      'en': {
        'wrd': 'Adjectives & contratry',
        'kk': {}
      },
      'fr': {
        'wrd': 'Adjectifs & contraires',
        'kk': {}
      },
      'lo': {
        'wrd': 'ຄໍາຄູນນາມກົງກັນຂາ້ມ',
        'kk': {}
      }
    }
    // { code: 'plants', trad: 'theme.plants' },
    // {
    //   code: 'days',
    //   trad: 'theme.days',
    //   en: 'Week days',
    //   fr: 'Les jours',
    //   lo: 'ວັນ'
    // },
    // {
    //   code: 'family',
    //   trad: 'theme.family',
    //   en: 'Family',
    //   fr: 'La famille',
    //   lo: 'ຄອບຄົວ'
    // },
    // {
    //   code: 'human_body',
    //   trad: 'theme.human_body',
    //   en: 'Human body',
    //   fr: 'Le corps humain',
    //   lo: 'ຮ່າງກາຍຂອງຄົນ'
    // },
    // {
    //   code: 'head',
    //   trad: 'theme.head',
    //   en: 'Head',
    //   fr: 'La tête',
    //   lo: 'ຫົວ'
    // }
  ];
  data = {
    learningThemeIdx: 0,
    learningTheme: null,
    isKaraoke: false,
    isReversed: false
  };
  constructor (private http: Http,
    private storage: StorageService,
    private apiService: ApiService) {
    this.data.learningThemeIdx = +this.storage.getItem('currentLearningThemeIdx') || 0;
    this.data.learningTheme = this.AVAILABLE_THEMES[this.data.learningThemeIdx];
  }
  getCurrentTheme () {
    return this.apiService
      .getData(`assets/themes/${this.data.learningTheme.uid}.json`)
      .map((res: Response): any => {
        return res.json();
      })
      .subscribe((parsedRes: Array<IThemeItem>) => {
      if (parsedRes && parsedRes.length && parsedRes.length >= 4) {
        this.currenThemeSource.next(parsedRes);
      } else {
        throw new Error(`/themes/${this.data.learningTheme.uid}.json wasn't parsed correctly.
          Check if fils exists ans is correctly formed and with at least 7 items`);
      }
    });
  }

  changeLearningTheme (idx: number) {
    if ((!isNaN(idx)) && (idx !== this.data.learningThemeIdx)) {
      this.data.learningThemeIdx = idx;
      this.data.learningTheme = this.AVAILABLE_THEMES[idx];
      this.storage.setItem('currentLearningThemeIdx', idx);
      this.getCurrentTheme();
    }
  }
}
