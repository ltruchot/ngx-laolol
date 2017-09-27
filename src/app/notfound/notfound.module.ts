import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';

// npm modules
import { TranslateModule } from '@ngx-translate/core';

// custom modules
import { SharedModule } from './../shared/shared.module';
import { NotfoundRoutingModule } from './notfound.routing-module';

@NgModule({
	imports: [
		CommonModule,
		TranslateModule,
		SharedModule,
		NotfoundRoutingModule
	],
	declarations: [NotfoundComponent]
})
export class NotfoundModule { }
