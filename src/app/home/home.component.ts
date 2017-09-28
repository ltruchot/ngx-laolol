// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// custom services
import { ItemService } from './../shared/services/item.service';
import { LanguageService } from './../shared/services/language.service';
import { ThemeService } from './../shared/services/theme.service';

// custom components
import { LaololComponent } from './../shared/components/abstract/laolol.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent extends LaololComponent implements OnInit {
	cpntData = {};
	constructor (public router: Router,
		itemService: ItemService, languageService: LanguageService, themeService: ThemeService) {
		super(itemService, languageService, themeService);
	}

	ngOnInit () {}

	changeLearningLang (code: string) {
		this.languageService.chooseLearningLang(code);
	}
}
