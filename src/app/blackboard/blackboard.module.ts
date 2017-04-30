import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { BlackboardComponent } from './blackboard.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: BlackboardComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [BlackboardComponent]
})
export class BlackboardModule { }
