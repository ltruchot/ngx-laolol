import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// custom modules
import { SharedModule } from './../shared/shared.module';

import { ExamsComponent } from './exams.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: ExamsComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [ExamsComponent]
})
export class ExamsModule { }
