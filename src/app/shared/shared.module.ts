// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';
import { LocalizeRouterModule } from 'localize-router';

// custom components

// custom pipes

@NgModule({
	imports: [
		CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, LocalizeRouterModule,
		RouterModule
	],
	declarations: [],
	providers: [],
	exports: [
		CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, LocalizeRouterModule,
		RouterModule
	]
})
export class SharedModule { }
