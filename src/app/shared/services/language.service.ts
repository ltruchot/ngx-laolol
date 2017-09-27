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

@Injectable()
export class LanguageService {
	DEFAULT_LEARNING_LANG = 'lo';
	AVAILABLE_LANG: ILanguage[] = [
		{ urlCode: 'en', code: 'en', flag: 'us', learnCode: 'lo', label: 'english', tradLabel: 'words.languageEnglish' },
		{ urlCode: 'fr', code: 'fr', flag: 'fr', learnCode: 'lo', label: 'français', tradLabel: 'words.languageFrench' },
		{ urlCode: 'ລາວ', code: 'lo', flag: 'la', learnCode: 'en', label: 'ພາສາລາວ', tradLabel: 'words.languageLao', noPlural: true }
	];
	data: ILanguageServiceData = {
		isCurrentLoading: false,
		isLearningLoading: true,
		currentLangInfos: null,
		learningLangInfos: null
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
		code = (code || this.DEFAULT_LEARNING_LANG);
		this.data.learningLangInfos = this.getLangInfos(code);
		this.storage.setItem('learningLanguage', code);
		this.data.isLearningLoading = false;
	}

	getLangInfos (code: string): ILanguage {
		return this.AVAILABLE_LANG.find(lang => lang.code === code || lang.urlCode === code);
	}
}
