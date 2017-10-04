// ng dependencies
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, DomSanitizer } from '@angular/platform-browser';

// ng dependencies
// import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

// custom service
import { LanguageService } from './language.service';

// custom models
import { ISeoServiceData } from './../models/services-data.models';

// custom values
import { environment } from './../../../environments/environment';

@Injectable()
export class SeoService {
	private urlParts: string[];
	siteUrl = environment.serverUrl + '/';
	data: ISeoServiceData = {
		breadCrumbSafeHtml: ''
	};
	constructor (private sanitizer: DomSanitizer, @Inject(DOCUMENT)
		private _document: HTMLDocument, private languageService: LanguageService/*,
		translate: TranslateService*/) {
		// translate.onLangChange.subscribe((event: LangChangeEvent) => {
		// 	this.applyCurrentLang(event.lang);
		// });
	}

	applyCurrentLang (code: string) {
		this._document.documentElement.lang = this.languageService.getLangInfos(code).code;
	}

	applyCurrentBreadCrumb (url: string) {
		this.urlParts = url.split('/');
		const breadCrumbJsonLD = this.getJsonLDBreadCrum();
		this.data.breadCrumbSafeHtml = this.sanitizer
			.bypassSecurityTrustHtml('<script type="application/ld+json">' + JSON.stringify(breadCrumbJsonLD) + '</script>');
	}

	getJsonLDBreadCrum () {
		let previousPart = '';
		const bcItems = this.urlParts.map((part: string) => {
			const bcItem = {
				'@type': 'ListItem',
				'position': 1,
				'item': {
					'@id': this.siteUrl + previousPart + part,
					'name': part
				}
			};
			previousPart += (part + '/');
			return bcItem;
		});
		return  {
			'@context': 'http://schema.org',
			'@type': 'BreadcrumbList',
			'itemListElement': bcItems
		};
	}
}
