import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ExamsComponent } from './exams.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: ExamsComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [ExamsComponent]
})
export class ExamsModule { }
