// ng dependencies
import { Component, OnInit } from '@angular/core';

// custom services
import { ItemService } from './../shared/services/item.service';
import { LanguageService } from './../shared/services/language.service';
import { ThemeService } from './../shared/services/theme.service';

// custom components
import { LaololComponent } from './../shared/components/abstract/laolol.component';

@Component({
	selector: 'app-exams',
	templateUrl: './exams.component.html'
})
export class ExamsComponent extends LaololComponent implements OnInit {
	cpntData = {};
	constructor (itemService: ItemService, languageService: LanguageService, themeService: ThemeService) {
		super(itemService, languageService, themeService);
	}

	ngOnInit () {}
}
