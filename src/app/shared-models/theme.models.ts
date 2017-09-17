import { Item } from './../shared-models/item.models';
export class Theme {
  _id?: string;
  uid: string;
  linkUid: string;
  link?: Item;
  en: IThemeLangItem;
  fr: IThemeLangItem;
  lo: IThemeLangItem;
  displayPlural?: boolean;
  isBasic?: boolean;
  hasImages?: boolean;
  hasSpecialExample?: boolean;
  noCapital?: boolean;
  noArticle?: boolean;
  noKaraoke?: boolean;
  noPlural?: boolean;
  levels?: number;
  laoClassifierUid: string;
  _userId?: string;
  constructor () {
    this.uid = '';
    this.en = new IThemeLangItem();
    this.fr = new IThemeLangItem();
    this.lo = new IThemeLangItem();
  }
};

export class IThemeLangItem {
  desc: Array<string>;
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

