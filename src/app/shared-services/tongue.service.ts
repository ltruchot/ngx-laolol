// ng dependencies
import { Injectable } from '@angular/core';

// custom models
import { Item } from './../shared-models/item.models';



@Injectable()
export class ModalService {
  constructor() {}

  getPlural (item: Item, lang: string, article: boolean) {
   return item[lang].meta && item[lang].meta.plural ?
     item[lang].meta.plural :
     item[lang].wrd + 's';
  }
}
