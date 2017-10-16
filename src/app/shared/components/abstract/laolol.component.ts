// ng dependencies
import { Component } from '@angular/core';

// custom dependencies
import { LanguageService } from './../../services/language.service';
import { ItemService } from './../../services/item.service';
import { ThemeService } from './../../services/theme.service';

// custom models
import { IItemServiceData, ILanguageServiceData, IThemeServiceData } from './../../models/services-data.models';

@Component({
	selector: 'app-laolol',
	template: ''
})
export class LaololComponent {
	langData: ILanguageServiceData;
	itemData: IItemServiceData;
	themeData: IThemeServiceData;
	constructor (protected itemService: ItemService,
		protected languageService: LanguageService,
		protected themeService: ThemeService) {
		this.langData = this.languageService.data;
		this.itemData = this.itemService.data;
		this.themeData = this.themeService.data;
	}

	/*
		A getter to recalculate if the lao special font is needed
 */
	get isCurrentLangLao () {
		return this.langData.current && this.langData.current.code === 'lo';
	}

	/*
		An other getter to recalculate if the lao special font is needed
 */
	get isLearningLangLao () {
		return this.langData.learning && this.langData.learning.code === 'lo';
	}
}
