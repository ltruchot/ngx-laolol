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
};

export interface ILangItem {
  wrd: string;
  kk: IKaraokeItem;
  ex?: string;
  img?: string;
  snd?: string;
  meta?: ILangItemMeta;
};

export interface IItem {
  _id: string;
  en: ILangItem;
  fr: ILangItem;
  lo: ILangItem;
  themes: Array<string>;
  img?: string;
  meta?: IItemMeta;
  _userId?: string;
};
