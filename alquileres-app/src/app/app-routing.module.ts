import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tipo-inmueble',
    loadChildren: () => import('./pages/tipo-inmueble/tipo-inmueble.module').then( m => m.TipoInmueblePageModule)
  },
  {
    path: 'localidad',
    loadChildren: () => import('./pages/localidad/localidad.module').then( m => m.LocalidadPageModule)
  },
  {
    path: 'servicio',
    loadChildren: () => import('./pages/servicio/servicio.module').then( m => m.ServicioPageModule)
  },  {
    path: 'inmueble',
    loadChildren: () => import('./pages/inmueble/inmueble.module').then( m => m.InmueblePageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
