// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// npm dependencies
// import { LocalizeRouterService } from 'localize-router';

// custom services
import { ThemeService } from './../../services/theme.service';
import { LanguageService } from './../../services/language.service';
import { ItemService } from './../../services/item.service';

// custom components
import { LaololComponent } from './../../components/abstract/laolol.component';

@Component({
	selector: 'app-submenu',
	templateUrl: './submenu.component.html'
})
export class SubmenuComponent extends LaololComponent implements OnInit {
	cpntData = {
		currentUrl: '',
		levels: []
	};
	constructor (public router: Router,
		itemService: ItemService, languageService: LanguageService, themeService: ThemeService) {
		super(itemService, languageService, themeService);
	}

	ngOnInit () {
		this.cpntData.currentUrl = '/' + this.router.url.split('/')[2];
	}

	changeLearningTheme (uid: string) {
		this.router.parseUrl(this.router.url);
		if (this.cpntData.currentUrl) {
			this.router.navigate([this.cpntData.currentUrl + '/' + uid]);
		}
	}
	changeLearningLevel (lvl: number) {
		// console.log('submenu.component::changeLearningThemeLvl');
		this.themeData.learningLevel = lvl;
		this.themeService.getCurrentTheme();
	}
	toggleKaraoke () {
		this.themeService.toggleKaraoke();
	}
	toggleMoreInfos () {
		this.themeService.toggleMoreInfos();
	}
	toggleLaoWriting () {
		this.themeService.toggleNoLaoWriting();
	}
}
