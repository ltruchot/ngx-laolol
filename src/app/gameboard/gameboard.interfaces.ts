import { IThemeItem } from './../shared-models/theme.interfaces';
export interface GameboardCpntData {
  winItemIdx: number;
  items: Array<IThemeItem>;
  clickedIdx: number;
  lang: any;
  availableLang: any;
  theme: any;
  availableTheme: any;
  currentQuestionTimer: string;
  isCheckingAnswer: boolean;
};
