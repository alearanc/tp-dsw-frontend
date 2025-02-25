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

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`reserva/getReservas`);
  }

  getReservasPasadas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`reserva/getReservasPasadas`);
  }

  getReservasCanceladas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(`reserva/getReservasCanceladas`);
  }

  cancelarReserva(reserva: Reserva): Observable<any> {
    return this.http.put(`reserva/cancelarReserva`, reserva);
  }

  valorarReserva(data: {
    id_inmueble: number;
    fecha_inicio: Date;
    puntuacion: number;
    valoracion?: string;
  }): Observable<Reserva> {
    return this.http.put<Reserva>(`reserva/valorarReserva`, data);
  }

}
