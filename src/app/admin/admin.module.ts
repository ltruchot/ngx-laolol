import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { SharedModule } from './../shared-components/shared.module';

import { CapitalizePipe } from './../shared-pipes/capitalize.pipe';

import { AdminComponent } from './admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [AdminComponent, CapitalizePipe]
})
export class AdminModule { }
