import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  store: any = null;
  constructor () {
    this.store = window.localStorage;
  }
  getItem (item): any {
    return this.store.getItem(item);
  }
  setItem (item, value) {
    this.store.setItem(item, value);
  }
}
