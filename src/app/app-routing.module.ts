import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'gameboard', loadChildren: './gameboard/gameboard.module#GameboardModule' },
  { path: '404', loadChildren: './notfound/notfound.module#NotfoundModule' },
  { path: '**', redirectTo: '/404'}
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
