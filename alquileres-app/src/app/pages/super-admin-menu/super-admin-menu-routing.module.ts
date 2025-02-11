import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuperAdminMenuPage } from './super-admin-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SuperAdminMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuperAdminMenuPageRoutingModule {}
