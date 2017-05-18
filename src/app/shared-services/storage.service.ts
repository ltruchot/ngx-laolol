import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  store: any = null;
  authorizedData = [
    'authToken',
    'currentLanguage',
    'currentLearningThemeIdx',
    'learningLanguage',
    'userInfos',
    'version'
  ];
  constructor () {
    this.store = window.localStorage;
  }
  getItem (key: string): any {
    // console.log('storage.service::getItem', key);
    const item = this.store.getItem(key);
    if (item && (item !== 'undefined')) {
      return JSON.parse(item);
    }
  }
  setItem (key, value) {
    // console.log('storage.service::setItem', key, value);
    if (this.authorizedData.indexOf(key) !== -1) {
      this.store.setItem(key, JSON.stringify(value));
    } else {
      console.error(`storage.service::setItem error, can't store unauthorized key: '${key}'.`);
    }
  }
  removeItem(key: string) {
    this.store.removeItem(key);
  }
  clear() {
    this.store.clear();
  }
}
