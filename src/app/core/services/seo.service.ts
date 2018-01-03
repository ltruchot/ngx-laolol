// ng dependencies
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, Meta, Title } from '@angular/platform-browser';

// ng dependencies
import { LocalizeRouterService } from 'localize-router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

// custom dependencies
import { environment } from '@env/environment';

// custom models
export interface ISeoServiceData {
	index: string;
	noindex: string;
}

@Injectable()
export class SeoService {
	data: ISeoServiceData = {
		index: 'index,follow',
		noindex: 'noindex,nofollow,noarchive,nosnippet,noimageindex'
	};
	constructor (
		@Inject(DOCUMENT)
		private _document: HTMLDocument,
		private metaService: Meta,
		private localizeRouterService: LocalizeRouterService,
		private translateService: TranslateService,
		private titleService: Title
	) {
		this.applyCurrentLang(this.localizeRouterService.parser.currentLang);
	}

	initialize () {
		// add indexation in production
		if (environment.production) {
			this.modifyMeta('robots', this.data.index);
		} else {
			this.modifyMeta('robots', this.data.noindex);
		}
		this.translateService.onLangChange.subscribe((e: LangChangeEvent) => {
			this.applyCurrentLang(e.lang);
		});
	}

	modifyMeta (name: string, content: string, isProperty?: boolean): void {
		const metaAssociation = (isProperty ? 'property' : 'name') + '="' + name + '"';
		const metaRobotsTag = this.metaService.getTag(metaAssociation);
		if (metaRobotsTag) {
			this.metaService.updateTag({
				content
			}, metaAssociation);
		} else {
			const tag = isProperty ? { property: name } : { name };
			this.metaService.addTag(Object.assign(tag, {
				content
			}), true);
		}
	}

	applyCurrentLang (lang: string) {
		this._document.documentElement.lang = lang;
		// this.changeMetaByLang();
		this.changeTitleByLang();
	}

	// changeMetaByLang () {
	// 	this.modifyMeta('og:url', this.translateService.instant('general.urlSite'), true);
	// 	this.modifyMeta('og:title', this.translateService.instant('metaTags.ogTitle'), true);
	// 	this.modifyMeta('og:description', this.translateService.instant('metaTags.ogDescription'), true);
	// }

	changeTitleByLang () {
		this.titleService.setTitle(this.translateService.instant('metaTags.title'));
	}
}
