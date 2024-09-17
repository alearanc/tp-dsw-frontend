import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'tipo-inmueble',
    loadChildren: () => import('./pages/tipo-inmueble/tipo-inmueble.module').then( m => m.TipoInmueblePageModule)
  },
  {
    path: 'foto-inmueble',
    loadChildren: () => import('./pages/foto-inmueble/foto-inmueble.module').then( m => m.FotoInmueblePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
