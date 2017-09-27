import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

import { AboutComponent } from './about.component';

const routes =  [{ path: '', component: AboutComponent, pathMatch: 'full'}];

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		RouterModule.forChild(routes),
		LocalizeRouterModule.forChild(routes)
	],
	declarations: [AboutComponent]
})
export class AboutModule { }
