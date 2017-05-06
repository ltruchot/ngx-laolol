// ng dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// npm dependencies
import { TranslateModule } from '@ngx-translate/core';

// custom modules
import { SharedModule } from './../shared-components/shared.module';

// custom components
import { GameboardComponent } from './gameboard.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    RouterModule.forChild([
      { path: '', component: GameboardComponent, pathMatch: 'full'}
    ])
  ],
  declarations: [GameboardComponent]
})
export class GameboardModule { }
