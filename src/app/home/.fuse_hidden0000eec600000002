// ng dependencies
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// custom services
import { ItemService } from './../shared/services/item.service';
import { LanguageService } from './../shared/services/language.service';
import { ThemeService } from './../shared/services/theme.service';

// custom models
import { Theme } from './../shared/models/theme.models';

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

	get studentSpecialThemes (): Theme[] {
		const studentThemes: string[] = ['laoConsonants', 'laoVowels', 'syllables'];
		const filteredThemes = this.themeData.all.filter((theme: Theme) => {
			return studentThemes.indexOf(theme.uid) !== -1;
		});
		return filteredThemes;
	}
	get studentThemes (): Theme[] {
		const studentThemes: string[] = ['professions', 'animals'];
		return this.themeData.all.filter((theme: Theme) => {
			return studentThemes.indexOf(theme.uid) !== -1;
		});
	}

	get studentDefaultTheme (): Theme {
		return this.themeData.all.find((theme: Theme) => theme.uid === 'professions');
	}

	get touristThemes (): Theme[] {
		const touristThemes: string[] = ['politeness', 'numbers', 'time', 'places'];
		return this.themeData.all.filter((theme: Theme) => {
			return touristThemes.indexOf(theme.uid) !== -1;
		});
	}

	get touristDefaultTheme (): Theme {
		return this.themeData.all.find((theme: Theme) => theme.uid === 'politeness');
	}

	get participantTheme (): Theme {
		return this.themeData.all.find((theme: Theme) => theme.uid === 'participants');
	}

	get pronunciationTheme (): Theme {
		return this.themeData.all.find((theme: Theme) => theme.uid === 'pronunciation');
	}

	changeLearningLang (code: string) {
		this.languageService.chooseLearningLang(code);
	}

	launchTutorial () {
		return false;
	}

	changeTheme (themeUid: string, isTourist: boolean) {
		this.themeData.displayKaraoke = isTourist;
		this.themeData.noLaoWriting = isTourist;
		this.themeData.isMoreInfos = true;
		this.themeData.learning = this.themeService.getThemeByUid(themeUid);
	}
}
