import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Reserva from 'src/app/models/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  constructor(private http: HttpClient) { }

  getReservasByInmueble(id_inmueble: number): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`reserva/getReservasByInmueble/${id_inmueble}`);
  }

  checkReservaFutura(id_inmueble: number): Observable<boolean> {
    return this.http.get<boolean>(`reserva/hasFutureReservation/${id_inmueble}`);
  }

  reservar(reserva: Reserva){
    return this.http.post(`reserva/reservar`, reserva);
  }
}
