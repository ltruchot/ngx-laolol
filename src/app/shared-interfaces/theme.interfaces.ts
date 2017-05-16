export interface IThemeItem {
  uid: string;
  en: ILangItem;
  fr: ILangItem;
  lo: ILangItem;
  themes: Array<string>;
  sound?: string;
  img?: string;
  meta?: any;
};

export interface ILangItem {
  wrd: string;
  ex: string;
  kk: ILangKaraokeItem;
  meta?: any;
};

export interface ILangKaraokeItem {
  en?: string;
  fr?: string;
  lo?: string;
}
