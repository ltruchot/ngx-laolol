export interface IThemeItem {
  uid: string;
  en: ILangItem;
  fr: ILangItem;
  lo: ILangItem;
  themes: Array<string>;
  img?: string;
  meta?: any;
};

export interface ILangItem {
  wrd: string;
  kk?: ILangKaraokeItem;
  ex?: string;
  sound?: string;
  meta?: any;
};

export interface ILangKaraokeItem {
  en?: string;
  fr?: string;
  lo?: string;
}
