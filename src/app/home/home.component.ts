// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// custom dependencies
import { LanguageService } from './../shared/services/language.service';
import { ThemeService } from './../shared/services/theme.service';

// custom components
import { LaololComponent } from './../shared/components/abstract/laolol.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html'
})
export class HomeComponent extends LaololComponent implements OnInit {
	cpntData = {
		theme: null
	};
	constructor (public router: Router, private themeService: ThemeService,
		languageService: LanguageService) {
		super(languageService);
	}

	ngOnInit () {
		this.cpntData.theme = this.themeService.data;
	}

	changeLearningLang (code: string) {
		this.languageService.chooseLearningLang(code);
	}
}
