// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
import {
	ISlicedSyllables,
	LaoneticsSorter
} from 'laonetics';

// custom models
import { Item } from './../models/item.models';
// import { Language } from './../models/language.models';

@Injectable()
export class LaoneticsService {
	sorter: LaoneticsSorter = new LaoneticsSorter();
	constructor () {
	}
	getKaraoke (word: string): ISlicedSyllables {
		return this.sorter.getKaraoke(word, [
			'fr', 'en', 'ph'
		]);
	}
	sortLaoItems (items: Item[]) {
		this.sorter.sortArrayByConsonant(items, 'lo.wrd');
	}
}
