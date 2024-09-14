import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Servicio from '../../models/Servicio';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private httpClient: HttpClient) { }

  getAllServicio(): Observable<Servicio[]>{
    return this.httpClient.get<Servicio[]>('http://localhost:3000/servicio/getAll');
  }

  addServicio(servicio : Servicio): Observable<Servicio[]>{
    return this.httpClient.post<Servicio[]>('http://localhost:3000/servicio/add',servicio);
  }

  deleteServicio(id_servicio : number): Observable<Servicio[]>{
    return this.httpClient.delete<Servicio[]>('http://localhost:3000/servicio/delete/' + id_servicio );
  }

  updateServicio(id_servicio : number, descripcion_servicio: string): Observable<Servicio[]>{
    return this.httpClient.put<Servicio[]>('http://localhost:3000/servicio/update/' + id_servicio, {descripcion_servicio});
  }

  //Acá van todas las peticiones al backend
}
