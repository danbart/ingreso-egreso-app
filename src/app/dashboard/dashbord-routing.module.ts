import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashbordRoutes } from './dashboard.routes';
// import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, children: dashbordRoutes}, // , canActivate: [ AuthGuardService ]
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class DashbordRoutingModule { }
