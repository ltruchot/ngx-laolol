// ng dependencies
import { NgModule, Optional, SkipSelf } from '@angular/core';

// custom components
import { SeoService } from '@core/services/seo.service';

@NgModule({
	imports: [],
	declarations: [],
	providers: [PouchdbService, SeoService],
	exports: []
})
export class CoreModule {
	/* make sure CoreModule is imported only by one NgModule the AppModule */
	constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
		if (parentModule) {
			throw new Error('CoreModule is already loaded. Should import only in AppModule');
		}
	}
}
