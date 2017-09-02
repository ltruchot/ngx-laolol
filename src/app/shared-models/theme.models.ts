import { Item } from './../shared-models/item.models';
export class Theme {
  _id?: string;
  uid: string;
  en: ThemeLangItem;
  fr: ThemeLangItem;
  lo: ThemeLangItem;
  hasCapital?: boolean;
  hasImages?: boolean;
  hasSpecialExample?: boolean;
  noArticle?: boolean;
  noKaraoke?: boolean;
  noPlural?: boolean;
  levels?: number;
  laoClassifier: string;
  laoClassifierKk: IThemeKaraokeItem;
  laoClassifierSnd: string;
  _userId?: string;
  constructor () {
    this.uid = '';
    this.en = new ThemeLangItem();
    this.fr = new ThemeLangItem();
    this.lo = new ThemeLangItem();
  }
};

export class ThemeLangItem {
  wrd: string;
  short?: string;
  kk: IThemeKaraokeItem;
  desc?: Array<string>;
   constructor () {
    this.wrd = '';
    this.kk = <IThemeKaraokeItem>{};
  }
};

export interface IThemeKaraokeItem {
  lo?: string;
  en?: string;
  fr?: string;
  ipa?: string;
};

export interface IThemeServiceData {
  all: Array<Theme>;
  current: Theme;
  learningUid: string;
  learning: Theme;
  isKaraoke: boolean;
  isReversed: boolean;
  isMoreInfos: boolean;
  isCurrentLoading: boolean;
  learningLevel: number;
  levels: Array<number>;
  items: Array<Item>;
}

