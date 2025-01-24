import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageInmueblesPage } from './manage-inmuebles.page';

const routes: Routes = [
  {
    path: '',
    component: ManageInmueblesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageInmueblesPageRoutingModule {}
