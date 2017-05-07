import { ThemeItem } from './../shared-interfaces/theme.interfaces';
export interface GameboardCpntData {
  winItemIdx: number;
  items: Array<ThemeItem>;
  clickedIdx: number;
  lang: any;
  availableLang: any;
  theme: any;
  availableTheme: any;
  currentQuestionTimer: string;
  isCheckingAnswer: boolean;
};
