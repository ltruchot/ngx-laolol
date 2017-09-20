import { Item } from './../shared/models/item.models';
export interface GameboardCpntData {
  winItemIdx: number;
  items: Array<Item>;
  clickedIdx: number;
  lang: any;
  theme: any;
  currentQuestionTimer: string;
  isCheckingAnswer: boolean;
};
