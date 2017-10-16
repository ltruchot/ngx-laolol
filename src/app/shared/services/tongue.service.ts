// ng dependencies
import { Injectable } from '@angular/core';

// npm dependencies
import * as slug from 'slug';
import {
	ISlicedSyllables,
	LaoneticsSorter,
	LaoneticsTranslater,
} from 'laonetics';

// custom services
import { LanguageService } from './../services/language.service';

// custom models
import { Item, TongueData } from './../models/item.models';
import { ILanguage } from './../models/language.models';

@Injectable()
export class TongueService {
	sorter: LaoneticsSorter = new LaoneticsSorter();
	translater: LaoneticsTranslater = new LaoneticsTranslater();
	constructor (private languageService: LanguageService) {
	}

	enhanceItem (item: Item) {
		const allLangages: ILanguage[] = this.languageService.data.availableLanguages;
		allLangages.forEach((language: ILanguage) => {
			item[language.code].tongue = new TongueData();
			item[language.code].tongue.plural = this.getPlural(item, language.code);
		});
	}

	getPlural (item: Item, languageCode: string) {
		if (languageCode !== 'lo') {
			return item[languageCode].meta && item[languageCode].meta.plural ?
				item[languageCode].meta.plural :
				item[languageCode].wrd + 's';
		} else {
			return item[languageCode].wrd;
		}
	}

	addSlugs (item: Item, plural?: boolean) {
		const allLangages: ILanguage[] = this.languageService.data.availableLanguages;
		allLangages.forEach((language: ILanguage) => {
			const wrdToSlug = plural ? item[language.code].tongue.plural : item[language.code].wrd;
			if (language.code !== 'lo') {
				item[language.code].tongue.slug = slug(wrdToSlug);
			} else {
				item[language.code].tongue.slug = wrdToSlug.replace(/\s/g, '');
			}
		});
	}

	getKaraoke (word: string): ISlicedSyllables {
		return this.translater.getKaraoke(word, [
			'fr', 'en', 'ph'
		]);
	}

	sortLaoItems (items: Item[]) {
		this.sorter.sortArrayByConsonant(items, 'lo.wrd');
	}

	generateLaonetics (item: Item) {
		const lo = item.lo;
		if (lo.wrd) {
			const slicedSyllables: ISlicedSyllables = this.getKaraoke(lo.wrd);
			lo.kk.fr = slicedSyllables.roms[0].join(' ');
			lo.kk.en = slicedSyllables.roms[1].join(' ');
			lo.kk.ipa = slicedSyllables.roms[2].join(' ');
		}
		if (lo.ex) {
			const slicedSyllables: ISlicedSyllables = this.getKaraoke(lo.ex);
			lo.kkEx.fr = slicedSyllables.roms[0].join(' ');
			lo.kkEx.en = slicedSyllables.roms[1].join(' ');
			lo.kkEx.ipa = slicedSyllables.roms[2].join(' ');
		}
	}
}
