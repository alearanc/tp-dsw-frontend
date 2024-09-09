import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalidadPage } from './localidad.page';

const routes: Routes = [
  {
    path: '',
    component: LocalidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocalidadPageRoutingModule {}
