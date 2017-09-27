// ng dependencies
import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// custom models
import { ISeoServiceData } from './../models/services-data.models';

@Injectable()
export class SeoService {
	private urlParts: string[];
	siteUrl = 'http://laolol.com/';
	data: ISeoServiceData = {
		breadCrumbSafeHtml: null
	};
	constructor (private sanitizer: DomSanitizer) {}
	applyCurrentBreadCrumb (url: string) {
		this.urlParts = url.split('/');
		const breadCrumbJsonLD = this.getJsonLDBreadCrum();
		this.data.breadCrumbSafeHtml = this.sanitizer
			.bypassSecurityTrustHtml(`<script type="application/ld+json">${breadCrumbJsonLD}</script>`);
	}
	getJsonLDBreadCrum () {
		let previousPart = '';
		const bcItems = this.urlParts.map((part: string) => {
			const bcItem = {
				'@type': 'ListItem',
				'position': 1,
				'item': {
					'@id': this.siteUrl + previousPart + part,
					'name': 'Books'
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

// {
// 	'@context': 'http://schema.org',
// 	'@type': 'BreadcrumbList',
// 	'itemListElement': [{
// 		'@type': 'ListItem',
// 		'position': 1,
// 		'item': {
// 			'@id': 'https://example.com/books',
// 			'name': 'Books',
// 			'image': 'http://example.com/images/icon-book.png'
// 		}
// 	}, {
// 		'@type': 'ListItem',
// 		'position': 2,
// 		'item': {
// 			'@id': 'https://example.com/books/authors',
// 			'name': 'Authors',
// 			'image': 'http://example.com/images/icon-author.png'
// 		}
// 	}, {
// 		'@type': 'ListItem',
// 		'position': 3,
// 		'item': {
// 			'@id': 'https://example.com/books/authors/annleckie',
// 			'name': 'Ann Leckie',
// 			'image': 'http://example.com/images/author-leckie-ann.png'
// 		}
// 	}, {
// 		'@type': 'ListItem',
// 		'position': 4,
// 		'item': {
// 			'@id': 'https://example.com/books/authors/ancillaryjustice',
// 			'name': 'Ancillary Justice',
// 			'image': 'http://example.com/images/cover-ancillary-justice.png'
// 		}
// 	}]
// }