export class Item {
	_id?: string;
	uid: string;
	validated?: boolean;
	en: LangItem;
	fr: LangItem;
	lo: LangItem;
	themes: string[];
	lvl: number;
	img?: string;
	meta?: IItemMeta;
	_userId?: string;
	constructor () {
		this.uid = '';
		this.en = new LangItem();
		this.fr = new LangItem();
		this.lo = new LangItem();
		this.themes = [];
		this.lvl = 0;
		this.meta = {} as IItemMeta;
	}
}

export class LangItem {
	wrd = '';
	meta = {} as ILangItemMeta;
	kk = {} as IKaraokeItem;
	kkEx = {} as IKaraokeItem;
	tongue = new TongueData();
	ex?: string;
	img?: string;
	snd?: string;
}

export interface ILangItemMeta {
	plural?: string;
	classifier?: string;
	comment?: string;
	feminine?: string;
	masculine?: string;
	isMale?: boolean;
}

export class TongueData {
	plural = '';
	slug?: string;
}

export interface IItemMeta {
	contrary?: string;
	conflicts?: string[];
	owner?: string;
	ownerResource?: string;
	illustratorUid?: string;
	weight?: number;
	displayArticle?: boolean;
}

export interface IKaraokeItem {
	lo?: string;
	en?: string;
	fr?: string;
	ipa?: string;
}
