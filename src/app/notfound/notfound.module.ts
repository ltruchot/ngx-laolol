// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

// custom modules
import { SharedModule } from './../shared/shared.module';

// custom components
import { NotfoundComponent } from './notfound.component';

const routes = [{ path: '', component: NotfoundComponent}];

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		SharedModule,
		RouterModule.forChild(routes),
		LocalizeRouterModule.forChild(routes)
	],
	declarations: [NotfoundComponent]
})
export class NotfoundModule { }
