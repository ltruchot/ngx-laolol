// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
// import { TranslateService } from '@ngx-translate/core';
// import { LocalizeRouterService } from 'localize-router';

// custom services
import { StorageService } from './storage.service';

// custom models
import { ILanguageServiceData } from './../models/services-data.models';
import { ILanguage } from './../models/language.models';

// custom values
import { AVAILABLE_LANGUAGES } from './../values/languages.values';

@Injectable()
export class LanguageService {
	defaultLearningLang = 'lo';
	data: ILanguageServiceData = {
		isCurrentLoading: false,
		isLearningLoading: true,
		currentLangInfos: null,
		learningLangInfos: null,
		availableLanguages: AVAILABLE_LANGUAGES
	};
	constructor (private storage: StorageService/*, private translate: TranslateService,
		private localize: LocalizeRouterService*/) {
	}

	changeTranslation (code: string) {
		// console.log('language.service::changeTranslation', code);
		this.chooseTranslation(code);
		this.chooseLearningLang(this.getLangInfos(code).learnCode);
	}

	chooseTranslation (code: string) {
		this.data.isCurrentLoading = true;
		this.data.currentLangInfos = this.getLangInfos(code);
		this.storage.setItem('currentLanguage', code);
		this.data.isCurrentLoading = false;
	}

	chooseLearningLang (code: string) {
		this.data.isLearningLoading = true;
		code = (code || this.defaultLearningLang);
		this.data.learningLangInfos = this.getLangInfos(code);
		this.storage.setItem('learningLanguage', code);
		this.data.isLearningLoading = false;
	}

	getLangInfos (code: string): ILanguage {
		return this.data.availableLanguages.find((lang: ILanguage) => lang.code === code || lang.urlCode === code);
	}
}
