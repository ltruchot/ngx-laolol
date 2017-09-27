import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LocalizeRouterModule } from 'localize-router';

const homeRoutes = [
	{ path: '',  component: HomeComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(homeRoutes),
		LocalizeRouterModule.forChild(homeRoutes)
	],
	exports: [ RouterModule, LocalizeRouterModule ]
})
export class HomeRoutingModule { }
