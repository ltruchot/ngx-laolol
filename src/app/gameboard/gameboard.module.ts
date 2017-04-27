import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GameboardComponent } from './gameboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: GameboardComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [GameboardComponent]
})
export class GameboardModule { }
