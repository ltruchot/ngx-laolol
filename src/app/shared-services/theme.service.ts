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
  AVAILABLE_THEMES = [{
    'uid': 'consonants',
    'noPlural': true,
    'noArticle': true,
    'hasImages': true,
    'hasSpecialExample': true,
    'en': {
      'wrd': 'Consonants',
      'kk': {}
    },
    'fr': {
      'wrd': 'Les consonnes',
      'short': 'Consonnes',
      'kk': {}
    },
    'lo': {
      'wrd': 'ພະຍັນຊະນະ',
      'kk': {}
    }
  }, {
    'uid': 'vowels',
    'noKaraoke': true,
    'noPlural': true,
    'noArticle': true,
    'en': {
      'wrd': 'Vowels',
      'kk': {}
    },
    'fr': {
      'wrd': 'Les voyelles',
      'short': 'Voyelles',
      'kk': {}
    },
    'lo': {
      'wrd': 'ສະຫຼະ',
      'kk': {}
    }
  }, {
    'uid': 'syllables',
    'noKaraoke': true,
    'noPlural': true,
    'noArticle': true,
    'levels': 2,
    'en': {
      'wrd': 'Syllables',
      'kk': {}
    },
    'fr': {
      'wrd': 'Les syllabes',
      'short': 'Syllabes',
      'kk': {}
    },
    'lo': {
      'wrd': 'ພະຍາງ',
      'kk': {}
    }
  }, {
    'uid': 'animals',
    'hasImages': true,
    'en': {
      'wrd': 'Animals',
      'short': 'Animals',
      'kk': {}
    },
    'fr': {
      'wrd': 'Les animaux',
      'short': 'Animaux',
      'kk': {}
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
    'noArticle': true,
    'en': {
      'wrd': 'Adjectives & contratry',
      'short': 'Adj. & contrary',
      'kk': {}
    },
    'fr': {
      'wrd': 'Adjectifs & contraires',
      'short': 'Adj. contraires',
      'kk': {}
    },
    'lo': {
      'wrd': 'ຄໍາຄູນນາມກົງກັນຂາ້ມ',
      'kk': {}
    }
  },
  {
    'uid': 'politness',
    'noPlural': true,
    'noArticle': true,
    'en': {
      'wrd': 'Politness',
      'kk': {}
    },
    'fr': {
      'wrd': 'La politesse',
      'short': 'Politesse',
      'kk': {}
    },
    'lo': {
      'wrd': 'ຄວາມສຸພາບ',
      'kk': {}
    }
  },
  {
    'uid': 'professions',
    'noPlural': true,
    'noArticle': true,
    'en': {
      'wrd': 'Professions',
      'kk': {}
    },
    'fr': {
      'wrd': 'Les métiers',
      'short': 'Métiers',
      'kk': {}
    },
    'lo': {
      'wrd': 'ອາຊີບ',
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
    learningThemeIdx: 3,
    learningTheme: null,
    isKaraoke: true,
    isReversed: false,
    isCurrentLoading: false,
    learningLevel: 0,
    levels: []
  };
  constructor (private http: Http,
    private storage: StorageService,
    private apiService: ApiService) {
    const currentThemeIdx = this.storage.getItem('currentLearningThemeIdx');
    const isKaraokeActivated = this.storage.getItem('isKaraokeActivated');
    this.data.learningThemeIdx = !isNaN(currentThemeIdx) ? currentThemeIdx : 3;
    this.data.learningTheme = this.AVAILABLE_THEMES[this.data.learningThemeIdx];
    this.data.isKaraoke = typeof isKaraokeActivated !== 'undefined' ? isKaraokeActivated : true;
    this.checkLevels();
  }
  checkLevels () {
    console.log('submenu.component::checkLevels', this.data.learningTheme);
    this.data.learningLevel = 0;
    const levels = this.data.learningTheme.levels;
    this.data.levels = levels ? Array.from(Array(levels).keys()) : [];
  }

  toggleKaraoke () {
    this.data.isKaraoke = !this.data.isKaraoke;
    this.storage.setItem('isKaraokeActivated', this.data.isKaraoke);
  }
  getCurrentTheme () {
    this.data.isCurrentLoading = true;
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
        this.data.isCurrentLoading = false;
    });
  }

  changeLearningTheme (idx: number) {
    if ((!isNaN(idx)) && (idx !== this.data.learningThemeIdx)) {
      this.data.learningThemeIdx = idx;
      this.data.learningTheme = this.AVAILABLE_THEMES[idx];
      this.checkLevels();
      this.storage.setItem('currentLearningThemeIdx', idx);
      this.getCurrentTheme();
    }
  }

  changeLearningThemeByUid (uid: string) {
    let idx = -1;
    const availableTheme = this.AVAILABLE_THEMES.find((item, itemIdx) => {
      idx = itemIdx;
      return item.uid === uid;
    });
    if (availableTheme && idx !== -1) {
      this.changeLearningTheme(idx);
    }
    return !!availableTheme;
  }

}
