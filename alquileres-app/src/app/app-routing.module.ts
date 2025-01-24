import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { PropietarioGuard } from './guards/propietario.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
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
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'recovery-account',
    loadChildren: () => import('./pages/recovery-account/recovery-account.module').then( m => m.RecoveryAccountPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate: [NoAuthGuard]
  },
  {
    path: 'ce-inmueble',
    loadChildren: () => import('./pages/ce-inmueble/ce-inmueble.module').then( m => m.CEInmueblePageModule),
    canActivate: [AuthGuard, PropietarioGuard]
  },
  {
    path: 'inmueble',
    loadChildren: () => import('./pages/inmueble-details/inmueble-details.module').then( m => m.InmuebleDetailsPageModule)
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then( m => m.CategoriesPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },
  {
    path: 'manage-inmuebles',
    loadChildren: () => import('./pages/manage-inmuebles/manage-inmuebles.module').then( m => m.ManageInmueblesPageModule),
    canActivate: [AuthGuard, PropietarioGuard]
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
