import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './notfound.component';
import { LocalizeRouterModule } from 'localize-router';

const routes = [
	{ path: '', component: NotfoundComponent}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		LocalizeRouterModule.forChild(routes)
	],
	exports: [ RouterModule, LocalizeRouterModule ]
})
export class NotfoundRoutingModule { }
