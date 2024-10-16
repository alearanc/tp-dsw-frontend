import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotoInmueblePage } from './foto-inmueble.page';

const routes: Routes = [
  {
    path: '',
    component: FotoInmueblePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotoInmueblePageRoutingModule {}
