export class Item {
  _id?: string;
  uid: string;
  validated?: boolean;
  en: LangItem;
  fr: LangItem;
  lo: LangItem;
  themes: Array<string>;
  lvl: number;
  img?: string;
  imgAuthor?: string;
  imgResource?: string;
  meta?: IItemMeta;
  _userId?: string;
  constructor () {
    this.uid = '';
    this.en = new LangItem();
    this.fr = new LangItem();
    this.lo = new LangItem();
    this.themes = [];
    this.lvl = 0;
    this.meta = <IItemMeta>{};
  }
};

export class LangItem {
  wrd: string;
  kk: IKaraokeItem;
  ex?: string;
  img?: string;
  snd?: string;
  meta: ILangItemMeta;
   constructor () {
    this.wrd = '';
    this.kk = <IKaraokeItem>{};
    this.meta = <ILangItemMeta>{};
  }
};

export interface ILangItemMeta {
  plural?: string;
  classifier?: string;
  comment?: string;
  feminine?: string;
  masculine?: string;
  isMale?: boolean;
};

export interface IItemMeta {
  contrary?: string;
  conflict?: Array<string>;
  owner?: string;
  ownerResource?: string;
};

export interface IKaraokeItem {
  lo?: string;
  en?: string;
  fr?: string;
  ipa?: string;
};

export interface IItemServiceData {
  all: Array<Item>;
  current: Item;
}
