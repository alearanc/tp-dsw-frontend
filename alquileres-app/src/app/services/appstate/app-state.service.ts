import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  menuItems = [
    { label: 'Buscar alquileres', path: '/', queryParams: {} },
    { label: 'Tipos de alojamiento', path: '/categories', queryParams: {} },
    { label: 'Lugares para alquilar', path: '/categories', queryParams: { localidades: true } },
  ]

  constructor() { }
}
