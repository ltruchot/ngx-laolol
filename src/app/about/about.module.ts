import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AboutComponent } from './about.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
