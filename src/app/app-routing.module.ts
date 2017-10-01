// ng dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

// npm dependencies
import {  TranslateService } from '@ngx-translate/core';
import { LocalizeParser, LocalizeRouterModule, LocalizeRouterSettings } from 'localize-router';
import { LocalizeRouterHttpLoader } from 'localize-router-http-loader';

// custom services
import { AdminActivationService } from './shared/services/admin-activation.service';

// custom values
import { ROUTES_CONFIG } from './shared/values/routes.values';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'about', loadChildren: './about/about.module#AboutModule' },
	{ path: 'blackboard/:themeSlug', loadChildren: './blackboard/blackboard.module#BlackboardModule' },
	{ path: 'exams', loadChildren: './exams/exams.module#ExamsModule' },
	{ path: 'gameboard/:themeSlug', loadChildren: './gameboard/gameboard.module#GameboardModule' },
	{ path: 'home', loadChildren: './home/home.module#HomeModule' },
	{
		path: 'admin',
		canActivate: [AdminActivationService],
		loadChildren: './admin/admin.module#AdminModule',
		data: { skipRouteLocalization: true }
	},
	{ path: 'notfound', loadChildren: './notfound/notfound.module#NotfoundModule' },
	{ path: '**', redirectTo: '/notfound' }
];

ROUTES_CONFIG.forEach((route: any) => {
	for (const key in route.paths) {
		if (route.paths.hasOwnProperty(key)) {
			if (route.name !== route.paths[key]) {
				const urlParam = route.urlParam ? '/:' + route.urlParam : '';
				routes.push({ path: route.paths[key] + urlParam, loadChildren: route.module });
			}
		}
	}
});

// language export for AOT build
// export function HttpLoaderFactory (translate: TranslateService, location: Location,
// 	settings: LocalizeRouterSettings, http: HttpClient) {
// 	return new LocalizeRouterHttpLoader(translate, location, settings, http);
// }

export function HttpLoaderFactory (translate: TranslateService, location: Location,
	settings: LocalizeRouterSettings, http: HttpClient) {
	return new LocalizeRouterHttpLoader(translate, location, settings, http, '/assets/locales.json');
}

@NgModule({
	imports: [
		RouterModule.forRoot(routes),
		LocalizeRouterModule.forRoot(routes, {
			parser: {
				provide: LocalizeParser,
				useFactory: HttpLoaderFactory,
				deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
			}
		})
	],
	exports: [ RouterModule, LocalizeRouterModule ]
})
class AppRoutingModule {}
export { AppRoutingModule };
