// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

// custom services
import { StorageService } from './storage.service';

// custom interfaces
import { Language } from './../shared-interfaces/language.interfaces';

@Injectable()
export class LanguageService {
  DEFAULT_LANG = 'en';
  DEFAULT_LEARNING_LANG = 'lo';
  AVAILABLE_LANG: Array<Language> = [
    { code: 'en', flag: 'us', learnCode: 'lo', label: 'english', trad: 'home.englishLanguage' },
    { code: 'fr', flag: 'fr', learnCode: 'lo', label: 'français', trad: 'home.frenchLanguage' },
    { code: 'lo', flag: 'la', learnCode: 'en', label: 'ພາສາລາວ', trad: 'home.laoLanguage' }
  ];
  data = {
    currentLang: 'en',
    learningLang: 'lo',
    isCurrentLoading: true,
    isLearningLoading: true,
    currentLangInfos: null,
    learningLangInfos: null
  };
  constructor(private storage: StorageService, private translate: TranslateService) {}
  initializeLanguages () {
    // prepare loading infos
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      if (this.data.learningLang === event.lang) {
        this.chooseLearningLang(this.getLangInfos(event.lang).learnCode);
      }
      this.data.isCurrentLoading = false;
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
    this.data.isCurrentLoading = true;
    code = (code || this.DEFAULT_LANG);
    this.translate.use(code);
    this.data.currentLang = code;
    this.data.currentLangInfos = this.getLangInfos(code);
    this.storage.setItem('currentLanguage', code);
  }

  chooseLearningLang (code: string) {
    this.data.isLearningLoading = true;
    code = (code || this.DEFAULT_LEARNING_LANG);
    this.data.learningLang = code;
    this.data.learningLangInfos = this.getLangInfos(code);
    this.storage.setItem('learningLanguage', code);
    this.data.isLearningLoading = false;
  }

  getLangInfos (code: string): Language {
    return this.AVAILABLE_LANG.find(lang => lang.code === code);
  }
}
