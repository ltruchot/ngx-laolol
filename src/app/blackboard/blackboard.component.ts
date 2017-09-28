// ng dependencies
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// npm dependencies
import { Subscription } from 'rxjs/Subscription';

// custom services
import { ItemService } from './../shared/services/item.service';
import { ThemeService } from './../shared/services/theme.service';
import { LanguageService } from './../shared/services/language.service';

// custome models
import { Theme } from './../shared/models/theme.models';
import { Item } from './../shared/models/item.models';

// custom components
import { LaololComponent } from './../shared/components/abstract/laolol.component';

@Component({
	selector: 'app-blackboard',
	templateUrl: './blackboard.component.html'
})
export class BlackboardComponent extends LaololComponent implements OnInit, OnDestroy {
	themeSubscription: Subscription;
	routeSubscription: Subscription;
	cpntData = {
		items: [],
		vowels: {
			fr: /[aeiouyAEIOUYàèìòùÀÈÌÒÙáéíóúâêîôûäëïöüÿÄËÏÖÜŸÆæœ]/,
			en: /[aeiou]/
		}
	};

	constructor (private route: ActivatedRoute,
		public router: Router,
		itemService: ItemService, languageService: LanguageService, themeService: ThemeService) {
		super(itemService, languageService, themeService);
	}

	ngOnInit () {
		this.themeSubscription = this.themeService.currentTheme$.subscribe((data: Item[]) => {
			this.resetTheme(data);
		});
		this.routeSubscription = this.route.params.subscribe((params: any) => {
			if (!this.themeData.all.length) {
				const sub = this.themeService.read$.subscribe(() => {
					sub.unsubscribe();
					this.checkRouteParams(params.uid);
				});
			} else {
				this.checkRouteParams(params.uid);
			}
		});
	}

	checkRouteParams (uid: string) {
		if (uid && this.themeData.all.find((theme: Theme) => theme.uid === uid)) {
			this.themeService.changeLearningTheme(uid);
		} else {
			this.router.navigate(['404']);
		}
	}

	resetTheme (data) {
		this.cpntData.items.length = 0;
		this.cpntData.items.push(...data);
		this.cpntData.items.forEach((item) => {
			this.langData.availableLanguages.forEach((avLang) => {
				const sound = item[avLang.code].snd;
				if (sound) {
					item[avLang.code].audio = new Audio();
					item[avLang.code].audio.src = '/assets/medias/' + sound;
					item[avLang.code].audioLoaded = false;
					item[avLang.code].audio.addEventListener('canplaythrough', function audioLoad () {
						item[avLang.code].audioLoaded = true;
						this.removeEventListener('canplaythrough', audioLoad);
					});
					item[avLang.code].audio.load();
				}
			});
		});
	}

	changeLearningLang (code: string) {
		this.languageService.chooseLearningLang(code);
	}

	playsound (index: string) {
		const lang = this.langData.learningLangInfos.code;
		if (this.cpntData.items[index][lang].audio) {
			this.cpntData.items[index][lang].audio.play();
		}
	}

	ngOnDestroy () {
		// prevent memory leak when component destroyed
		this.themeSubscription.unsubscribe();
		this.routeSubscription .unsubscribe();
	}
}
