// ng dependencies
import { Injectable } from '@angular/core';

// custom services
import { LanguageService } from './../services/language.service';


// custom models
import { Item, TongueData } from './../models/item.models';
import { Language } from './../models/language.models';



@Injectable()
export class TongueService {
  constructor(private languageService: LanguageService) {
  }

  enhanceItem (item: Item) {
   const allLangages: Array<Language> = this.languageService.AVAILABLE_LANG;
    allLangages.forEach((language: Language) => {
      item[language.code].tongue = new TongueData();
      item[language.code].tongue.plural = this.getPlural(item, language.code);
    });
  }

  getPlural (item: Item, languageCode: string) {
    if (languageCode === 'en' || languageCode === 'fr' ) {
      return item[languageCode].meta && item[languageCode].meta.plural ?
        item[languageCode].meta.plural :
        item[languageCode].wrd + 's';
    } else {
      return item[languageCode].wrd;
    }

  }
}
