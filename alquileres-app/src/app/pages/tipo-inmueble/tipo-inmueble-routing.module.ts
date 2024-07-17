import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TipoInmueblePage } from './tipo-inmueble.page';

const routes: Routes = [
  {
    path: '',
    component: TipoInmueblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TipoInmueblePageRoutingModule {}
