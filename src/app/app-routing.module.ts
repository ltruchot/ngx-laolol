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
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: './home/home.module#HomeModule' },
	{ path: 'gameboard/:uid', loadChildren: './gameboard/gameboard.module#GameboardModule' },
	{ path: 'blackboard/:uid', loadChildren: './blackboard/blackboard.module#BlackboardModule' },
	{ path: 'exams', loadChildren: './exams/exams.module#ExamsModule' },
	{ path: 'about', loadChildren: './about/about.module#AboutModule' },
	{ path: 'admin', canActivate: [AdminActivationService], loadChildren: './admin/admin.module#AdminModule' },
	{ path: '404', loadChildren: './notfound/notfound.module#NotfoundModule' }
];

ROUTES_CONFIG.forEach((route: any) => {
	for (const key in route.paths) {
		if (route.paths.hasOwnProperty(key)) {
			// if (route.name !== route.paths[key]) {
				const param = route.param ? '/' + route.param : '';
				routes.push({ path: route.paths[key] + param, loadChildren: route.module });
			// }
		}
	}
});
console.log(routes);
routes.push({ path: '**', redirectTo: '/404' });

// language export for AOT build
export function HttpLoaderFactory (translate: TranslateService, location: Location,
	settings: LocalizeRouterSettings, http: HttpClient) {
	return new LocalizeRouterHttpLoader(translate, location, settings, http);
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
