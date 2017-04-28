import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable()
export class LanguageService {
  DEFAULT_LANG = 'en';
  AVAILABLE_LANG = [
    { code: 'en', flag: 'us', label: 'english' },
    { code: 'fr', flag: 'fr', label: 'français' },
    { code: 'lo', flag: 'la', label: 'ພາສາລາວ' }
  ];
  data = {
    currentLang: 'en',
    learningLang: 'lo'
  };
  constructor(private storage: StorageService, private translate: TranslateService) {}
  initializeLanguages () {
    // prepare to default langage
    this.translate.setDefaultLang(this.DEFAULT_LANG);

    // set current translation
    const currentLanguage: string = this.storage.getItem('currentLanguage');
    this.chooseTranslation(currentLanguage);
  }
  chooseTranslation (code: string) {
    code = code || this.DEFAULT_LANG;
    this.translate.use(code);
    this.data.currentLang = code;
    this.storage.setItem('currentLanguage', code);
  }
  chooseLearningLang (code: string) {
    this.data.learningLang = code;
  }
}
