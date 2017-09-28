import { SafeHtml } from '@angular/platform-browser';
import { ILanguage } from './language.models';
import { Item } from './item.models';
import { Theme } from '../models/theme.models';

export interface ISeoServiceData {
	breadCrumbSafeHtml: SafeHtml;
}

export interface ILanguageServiceData {
	isCurrentLoading: boolean;
	isLearningLoading: boolean;
	current: ILanguage;
	learning: ILanguage;
	availableLanguages: ILanguage[];
}

export interface IItemServiceData {
	all: Item[];
	current: Item;
}

export interface IItemsResponse {
	data: Item[];
	theme: string;
}

export interface IThemeServiceData {
	all: Theme[];
	current: Theme;
	learningUid: string;
	learning: Theme;
	displayKaraoke: boolean;
	isReversed: boolean;
	isMoreInfos: boolean;
	isCurrentLoading: boolean;
	learningLevel: number;
	levels: number[];
	items: Item[];
}
