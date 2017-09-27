import { SafeHtml } from '@angular/platform-browser';
import { ILanguage } from './language.models';

export interface ISeoServiceData {
	breadCrumbSafeHtml: SafeHtml;
}

export interface ILanguageServiceData {
	isCurrentLoading: boolean;
	isLearningLoading: boolean;
	currentLangInfos: ILanguage;
	learningLangInfos: ILanguage;
}
