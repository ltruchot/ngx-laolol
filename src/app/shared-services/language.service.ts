import { Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { StorageService } from './storage.service';

@Injectable()
export class LanguageService {
  DEFAULT_LANG = 'en';
  DEFAULT_LEARNING_LANG = 'lo';
  AVAILABLE_LANG = [
    { code: 'en', flag: 'us', label: 'english', trad: 'home.englishLanguage' },
    { code: 'fr', flag: 'fr', label: 'français', trad: 'home.frenchLanguage' },
    { code: 'lo', flag: 'la', label: 'ພາສາລາວ', trad: 'home.laoLanguage' }
  ];
  data = {
    currentLang: 'en',
    learningLang: 'lo',
    isLoading: true
  };
  constructor(private storage: StorageService, private translate: TranslateService) {}
  initializeLanguages () {
    // prepare loading infos
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.data.isLoading = false;
    });

    // set default langage
    this.translate.setDefaultLang(this.DEFAULT_LANG);

    // set current translation
    const currentLanguage: string = this.storage.getItem('currentLanguage') || '';
    this.chooseTranslation(currentLanguage);

    // set current leaning lang
    const learningLanguage: string = this.storage.getItem('learningLanguage') || '';
    this.chooseLearningLang(learningLanguage);
  }
  chooseTranslation (code: string) {
    this.data.isLoading = true;
    code = (code || this.DEFAULT_LANG);
    this.translate.use(code);
    this.data.currentLang = code;
    this.storage.setItem('currentLanguage', code);
  }
  chooseLearningLang (code: string) {
    code = (code || this.DEFAULT_LEARNING_LANG);
    this.data.learningLang = code;
    this.storage.setItem('learningLanguage', code);
  }
}
