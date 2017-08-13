export class Item {
  _id?: string;
  uid: string;
  validated?: boolean;
  en: LangItem;
  fr: LangItem;
  lo: LangItem;
  themes: Array<string>;
  img?: string;
  meta?: IItemMeta;
  _userId?: string;
  constructor () {
    this._id = '';
    this.uid = '';
    this.validated = false;
    this.en = new LangItem();
    this.fr = new LangItem();
    this.lo = new LangItem();
    this.themes = [];
    this.img = '';
    this.meta = <IItemMeta>{};
    this._userId = '';
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
};

export interface IKaraokeItem {
  lo?: string;
  en?: string;
  fr?: string;
  ipa?: string;
};

export class LangItem {
  wrd: string;
  kk: IKaraokeItem;
  ex?: string;
  img?: string;
  snd?: string;
  meta?: ILangItemMeta;
   constructor () {
    this.wrd = '';
    this.kk = <IKaraokeItem>{};
    this.ex = '';
    this.img = '';
    this.snd = '';
    this.meta = <ILangItemMeta>{};
  }
};

export interface IItemServiceData {
  all: Array<Item>;
  current: Item;
}
