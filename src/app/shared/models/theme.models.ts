import { Item } from './../models/item.models';
export class Theme {
	_id?: string;
	uid: string;
	linkUid: string;
	link?: Item;
	en: ThemeLangItem;
	fr: ThemeLangItem;
	lo: ThemeLangItem;
	displayPlural?: boolean;
	isLaoAlphabet?: boolean;
	isVisible?: boolean;
	isBasic?: boolean;
	hasImages?: boolean;
	hasSpecialExample?: boolean;
	noArticle?: boolean;
	noKaraoke?: boolean;
	noPlural?: boolean;
	levels = 1;
	laoClassifierUid: string;
	_userId?: string;
	validated?: boolean;
	constructor () {
		this.uid = '';
		this.en = new ThemeLangItem();
		this.fr = new ThemeLangItem();
		this.lo = new ThemeLangItem();
	}
}

export class ThemeLangItem {
	desc: string[] = [];
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
