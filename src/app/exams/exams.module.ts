import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

// custom modules
import { SharedModule } from './../shared/shared.module';

import { ExamsComponent } from './exams.component';

const routes =  [{ path: '', component: ExamsComponent, pathMatch: 'full'}];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TranslateModule,
		RouterModule.forChild(routes),
		LocalizeRouterModule.forChild(routes)
	],
	declarations: [ExamsComponent]
})
export class ExamsModule { }
