// ng dependencies
import { Component, OnInit } from '@angular/core';

// custom interfaces
import { GameboardCpntData } from './gameboard.interfaces';
import { GameItem } from './../shared-interfaces/game.interfaces';

// custom services
import { GameService } from './../shared-services/game.service';

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html'
})
export class GameboardComponent implements OnInit {
  cpntData: GameboardCpntData = {
    winItemIdx: null,
    items: [],
    clickedIdx: null
  };
  allItems: Array<GameItem> = [];
  constructor (private gameService: GameService) { }

  ngOnInit () {
    this.gameService.getDays().subscribe(days => {
      this.allItems.length = 0;
      this.allItems.push(...days);
      this.changeDisplayedItems();
    });
  }

  changeDisplayedItems () {
    const ITEM_DISPLAYED_NBR = 4;
    const items = this.allItems;
    for (let i = 0; i < ITEM_DISPLAYED_NBR; i++) {
      const randomItemIdx = Math.floor(Math.random() * items.length);
      this.cpntData.items.push(items[randomItemIdx]);
      this.allItems.splice(randomItemIdx, 1);
    }
    this.cpntData.winItemIdx = Math.floor(Math.random() * ITEM_DISPLAYED_NBR);
  }

  checkAnswer (index) {
    this.cpntData.clickedIdx = index;
  }
  nextQuestion () {
    this.cpntData.clickedIdx = null;
    this.cpntData.winItemIdx = null;
    this.allItems.push(...this.cpntData.items);
    this.cpntData.items.length = 0;
    this.changeDisplayedItems();
  }
}
