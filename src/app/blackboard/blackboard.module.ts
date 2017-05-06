// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';

// custom modules
import { SharedModule } from './../shared-components/shared.module';

// custom components
import { BlackboardComponent } from './blackboard.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: BlackboardComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [BlackboardComponent]
})
export class BlackboardModule { }
