import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InmuebleDetailsPage } from './inmueble-details.page';

const routes: Routes = [
  {
    path: '',
    component: InmuebleDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InmuebleDetailsPageRoutingModule {}
