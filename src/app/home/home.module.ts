// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// npm modules
import { TranslateModule } from '@ngx-translate/core';

// custom modules
import { SharedModule } from './../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
// custom components
import { HomeComponent } from './home.component';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		SharedModule,
		HomeRoutingModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
