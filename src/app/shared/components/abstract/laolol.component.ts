// ng dependencies
import { Component, OnInit } from '@angular/core';

// custom dependencies
import { LanguageService } from './../../services/language.service';

// custom models
import { ILanguageServiceData } from './../../models/services-data.models';

@Component({})
export class LaololComponent implements OnInit {
	langData:ILanguageServiceData;
	constructor (protected languageService: LanguageService) {
		this.langData = this.languageService.data;
	}

	ngOnInit () {

	}

	/*
		A getter to recalculate if the lao special font is needed
 */
	get isCurrentLangLao () {
		return this.langData.currentLangInfos && this.langData.currentLangInfos.code === 'lo'
	}
}
