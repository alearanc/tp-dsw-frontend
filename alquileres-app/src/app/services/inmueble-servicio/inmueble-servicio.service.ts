import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import InmuebleServicio from 'src/app/models/inmuebleServicio';

@Injectable({
  providedIn: 'root'
})
export class InmuebleServicioService {

  constructor(private httpClient: HttpClient) { }

  apiUrl= 'inmuebleServicio'

  getServiciosByInmuebleId(id_inmueble: number): Observable<InmuebleServicio[]> {
    return this.httpClient.get<InmuebleServicio[]>(`${this.apiUrl}/get/${id_inmueble}`);
  }

  addInmuebleServicio(inmuebleServicios: { id_inmueble: number; id_servicio: number }[]): Observable<InmuebleServicio[]> {
    return this.httpClient.post<InmuebleServicio[]>(`${this.apiUrl}/add`, inmuebleServicios);
  }

  deleteInmuebleServicio(id_inmueble: number, id_servicio: number): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/delete/${id_inmueble}/${id_servicio}`);
  }
}
