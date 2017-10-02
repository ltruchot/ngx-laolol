// ng dependencies
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event as RouterEvent, NavigationEnd, Router } from '@angular/router';

// npm dependencies
import { Subscription } from 'rxjs/Subscription';

// custom services
import { SeoService } from './../../services/seo.service';

// custom models
import { ISeoServiceData } from './../../models/services-data.models';

@Component({
	selector: 'app-jsonld',
	template: '<span [innerHTML]="seoData.breadCrumbSafeHtml"></span>'
})
export class JsonldComponent implements OnDestroy, OnInit {
	routeSubscription: Subscription;
	seoData: ISeoServiceData;
	constructor (private seoService: SeoService, private router: Router) {
		this.seoData = this.seoService.data;
	}

	ngOnInit () {
		this.routeSubscription = this.router.events.subscribe((event: RouterEvent) => {
			if (event instanceof NavigationEnd) {
				this.seoService.applyCurrentBreadCrumb(event.urlAfterRedirects);
			}
		});
	}

	ngOnDestroy () {
		this.routeSubscription.unsubscribe();
	}
}
