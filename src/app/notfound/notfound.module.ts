import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: NotfoundComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [NotfoundComponent]
})
export class NotfoundModule { }
