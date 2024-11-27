import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {

  menuItems = [
    { label: 'Buscar alquileres', path: '/', queryParams: {} },
    { label: 'Categorías', path: '/categories', queryParams: {} },
    { label: 'Lugares para alquilar', path: '/categories', queryParams: { localidades: true } },
  ]

  constructor() { }
}
