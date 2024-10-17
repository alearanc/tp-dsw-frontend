import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Inmueble from 'src/app/models/Inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private apiUrl = 'inmueble';

  constructor(private http: HttpClient) { }

  addInmueble(inmueble: Inmueble): Observable<Inmueble> {
    return this.http.post<Inmueble>(`${this.apiUrl}/add`, inmueble);
  }

  toggleVisibilidad(inmueble: Inmueble): Observable<Inmueble> {
    return this.http.put<Inmueble>(`${this.apiUrl}/toggleVisibilidad`, inmueble);
  }

  getInmueblesSinReservas(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/getInmuebleSinReservas`);
  }

  getInmueblesByLocalidad(idLocalidad: number): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/getByLocalidad/${idLocalidad}`);
  }

  getInmueblesByTipoInmueble(idTipoInmueble: number): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/getByTipoInmueble/${idTipoInmueble}`);
  }

  getAllInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/get`);
  }

  getMisInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/getMisInmuebles`);
  }

  getInmueble(idInmueble: number): Observable<Inmueble> {
    return this.http.get<Inmueble>(`${this.apiUrl}/get/${idInmueble}`);
  }

  updateInmueble(idInmueble: number, inmueble: Inmueble): Observable<Inmueble> {
    return this.http.put<Inmueble>(`${this.apiUrl}/update/${idInmueble}`, inmueble);
  }
  
  deleteInmueble(idInmueble: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${idInmueble}`);
  }

}
