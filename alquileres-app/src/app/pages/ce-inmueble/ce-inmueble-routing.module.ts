import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CEInmueblePage } from './ce-inmueble.page';

const routes: Routes = [
  {
    path: '',
    component: CEInmueblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CEInmueblePageRoutingModule {}
