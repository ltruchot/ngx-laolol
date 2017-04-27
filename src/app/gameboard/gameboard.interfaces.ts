import { GameItem } from './../shared-interfaces/game.interfaces';
export interface GameboardCpntData {
  winItemIdx: number;
  items: Array<GameItem>;
  clickedIdx: number;
};
