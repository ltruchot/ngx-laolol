import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

// custom modules
import { SharedModule } from './../shared/shared.module';

import { AdminComponent } from './admin.component';

const routes =  [{ path: '', component: AdminComponent, pathMatch: 'full'}];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SharedModule,
		TranslateModule,
		RouterModule.forChild(routes),
		LocalizeRouterModule.forChild(routes)
	],
	declarations: [AdminComponent]
})
export class AdminModule { }
