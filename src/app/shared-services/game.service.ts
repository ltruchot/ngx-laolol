import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// custom interfaces
import { GameItem } from './../shared-interfaces/game.interfaces';

@Injectable()
export class GameService {

  constructor(private http: Http) { }

  getGame (fileName: string) {
    return this.http.request(`assets/games/${fileName}.json`).map(res => {
      const parsedRes: Array<GameItem> = res.json();
      if (parsedRes && parsedRes.length && parsedRes.length >= 7) {
        return parsedRes;
      } else {
        throw new Error(`/games/${fileName}.json wasn't parsed correctly.
          Check if fils exists ans is correctly formed and with at least 7 items`);
      }
    });
  }
  getDays () {
     return this.getGame('days');
  }
}
