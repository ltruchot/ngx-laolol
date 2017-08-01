// ng dependencies
import { Injectable } from '@angular/core';

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
  themeOptions: Array<string> = [
    'hasCapital',
    'hasImages',
    'hasSpecialExample',
    'levels',
    'noArticle',
    'noKaraoke',
    'noPlural',
  ];
  AVAILABLE_THEMES = [{
    'uid': 'consonants',
    'noPlural': true, 'noArticle': true, 'hasImages': true, 'hasSpecialExample': true, 'hasCapital': true,
    'en': { 'wrd': 'Consonants' },
    'fr': { 'wrd': 'Les consonnes', 'short': 'Consonnes'
    },
    'lo': {
      'wrd': 'ພະຍັນຊະນະ'
    }
  }, {
    'uid': 'vowels',
    'noKaraoke': true,
    'noPlural': true,
    'noArticle': true,
    'hasCapital': true,
    'levels': 3,
    'en': {
      'wrd': 'Vowels'
    },
    'fr': {
      'wrd': 'Les voyelles',
      'short': 'Voyelles'
    },
    'lo': {
      'wrd': 'ສະຫຼະ'
    }
  }, {
    'uid': 'syllables',
    'noKaraoke': true, 'noPlural': true, 'noArticle': true, 'hasCapital': true,
    'levels': 2,
    'en': { 'wrd': 'Syllables' },
    'fr': { 'wrd': 'Les syllabes', 'short': 'Syllabes' },
    'lo': {
      'wrd': 'ພະຍາງ'
    }
  }, {
    'uid': 'politness',
    'noPlural': true, 'noArticle': true,
    'en': { 'wrd': 'Politness' },
    'fr': { 'wrd': 'La politesse', 'short': 'Politesse' },
    'lo': { 'wrd': 'ຄວາມສຸພາບ' }
  }, {
    'uid': 'family',
    'hasCapital': true,
    'levels': 2,
    'en': { 'wrd': 'Family' },
    'fr': { 'wrd': 'La famille', 'short': 'Famille' },
    'lo': { 'wrd': 'ຄອບຄົວ' }
  }, {
    'uid': 'animals',
    'hasImages': true, 'hasCapital': true,
    'en': { 'wrd': 'Animals', 'short': 'Animals' },
    'fr': { 'wrd': 'Les animaux', 'short': 'Animaux' },
    'lo': {
      'wrd': 'ສັດ',
      'kk': {'en': 'sad', 'fr': 'sat' },
      'meta': {
        'classifier': 'ໂຕ',
        'cl_kk': { 'fr': 'to:', 'en': 'to:' }
      }
    }
  }, {
    'uid': 'adj-with-contrary',
    'noPlural': true, 'noArticle': true,
    'en': { 'wrd': 'Adjectives & contratry', 'short': 'Adj. & contrary' },
    'fr': { 'wrd': 'Adjectifs & contraires', 'short': 'Adj. contraires' },
    'lo': { 'wrd': 'ຄໍາຄູນນາມກົງກັນຂາ້ມ' }
  }, {
    'uid': 'professions',
    'levels': 3,
    'noPlural': true, 'noArticle': true,
    'en': {
      'wrd': 'Professions',
      'desc': ['', '']
    },
    'fr': {
      'wrd': 'Les métiers',
      'short': 'Métiers',
      'desc': [
        'En lao, pour certains métiers on distingue le masculin du féminin en utilisant "ພໍ່" et "ແມ່", littéralement "père" et "mère".',
        'En lao, la plupart des métiers techniques commence par le mot"ຊ່າງ" (sâ:ng), littéralement "technicien", ou encore "ຊ່າງແປງ", "le réparateur".',
        'En lao, les métiers artistiques ou nécessitant un talent particulier commence souvent par le mot "ນັກ", littéralement "expert".'
      ]
    },
    'lo': { 'wrd': 'ອາຊີບ' }
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
    isKaraoke: true,
    isReversed: false,
    isMoreInfos: false,
    isCurrentLoading: false,
    learningLevel: 0,
    levels: [],
    items: {}
  };
  constructor (private storage: StorageService, private apiService: ApiService) {
    const currentThemeIdx = this.storage.getItem('currentLearningThemeIdx');
    const isKaraokeActivated = this.storage.getItem('isKaraokeActivated');
    const isMoreInfosActivated = this.storage.getItem('isMoreInfosActivated');
    this.data.learningThemeIdx = !isNaN(currentThemeIdx) ? currentThemeIdx : 5;
    this.data.learningTheme = this.AVAILABLE_THEMES[this.data.learningThemeIdx];
    this.data.isKaraoke = typeof isKaraokeActivated !== 'undefined' ? isKaraokeActivated : true;
    this.data.isMoreInfos = typeof isMoreInfosActivated !== 'undefined' ? isMoreInfosActivated : true;
    this.checkLevels();
  }
  checkLevels () {
    // console.log('submenu.component::checkLevels', this.data.learningTheme);
    this.data.learningLevel = 0;
    const levels = this.data.learningTheme.levels;
    this.data.levels = levels ? Array.from(Array(levels + 1).keys()) : [];
  }

  toggleKaraoke () {
    this.data.isKaraoke = !this.data.isKaraoke;
    this.storage.setItem('isKaraokeActivated', this.data.isKaraoke);
  }
  toggleMoreInfos () {
    this.data.isMoreInfos = !this.data.isMoreInfos;
    this.storage.setItem('isMoreInfosActivated', this.data.isMoreInfos);
  }

  getCurrentLevel () {
    console.log('theme.services::getCurrentLevel', this.data.learningLevel, this.data.levels.length);
    let items: Array<IThemeItem>;
    if (this.data.learningLevel < this.data.levels.length - 1) {
      items = this.data.items[this.data.learningTheme.uid].filter(item => item.themes.indexOf('lvl' + (this.data.learningLevel)) !== -1);
    } else {
      items = this.data.items[this.data.learningTheme.uid];
    }
    return items;
  }

  getCurrentTheme () {
    this.data.isCurrentLoading = true;
    if (this.data.items[this.data.learningTheme.uid]) {
      this.currenThemeSource.next(this.getCurrentLevel());
      this.data.isCurrentLoading = false;
    } else {
      this.apiService
        .getData(`assets/themes/${this.data.learningTheme.uid}.json`)
        .map((res: Response): any => {
          return res.json();
        })
        .subscribe((parsedRes: Array<IThemeItem>) => {
          if (parsedRes && parsedRes.length && parsedRes.length >= 4) {
            this.data.items[this.data.learningTheme.uid] = parsedRes;
            this.currenThemeSource.next(this.getCurrentLevel());
          } else {
            throw new Error(`/themes/${this.data.learningTheme.uid}.json wasn't parsed correctly.
              Check if fils exists ans is correctly formed and with at least 7 items`);
          }
          this.data.isCurrentLoading = false;
      });
    }
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
