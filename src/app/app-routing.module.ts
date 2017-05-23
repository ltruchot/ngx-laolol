// ng dependencies
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// custom components
import { HomeComponent } from './home/home.component';
// custom services
import { AdminActivationService } from './shared-services/admin-activation.service';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full'},
  { path: 'gameboard', loadChildren: './gameboard/gameboard.module#GameboardModule' },
  { path: 'blackboard', loadChildren: './blackboard/blackboard.module#BlackboardModule' },
  { path: 'exams', loadChildren: './exams/exams.module#ExamsModule' },
  { path: 'admin', canActivate: [AdminActivationService], loadChildren: './admin/admin.module#AdminModule' },
  { path: '404', loadChildren: './notfound/notfound.module#NotfoundModule' },
  { path: '**', redirectTo: '/404' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
