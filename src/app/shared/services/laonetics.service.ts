// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
import {
	ISlicedSyllables,
	LaoneticsSorter,
	LaoneticsTranslater,
} from 'laonetics';

// custom models
import { Item } from './../models/item.models';
// import { ILanguage } from './../models/language.models';

@Injectable()
export class LaoneticsService {
	sorter: LaoneticsSorter = new LaoneticsSorter();
	translater: LaoneticsTranslater = new LaoneticsTranslater();
	constructor () {
	}
	getKaraoke (word: string): ISlicedSyllables {
		return this.translater.getKaraoke(word, [
			'fr', 'en', 'ph'
		]);
	}
	sortLaoItems (items: Item[]) {
		this.sorter.sortArrayByConsonant(items, 'lo.wrd');
	}
}
