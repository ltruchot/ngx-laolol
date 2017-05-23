import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
