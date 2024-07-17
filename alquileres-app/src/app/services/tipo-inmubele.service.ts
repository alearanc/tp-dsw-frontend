import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import TipoInmueble from '../models/TipoInmueble';

@Injectable({
  providedIn: 'root'
})
export class TipoInmubeleService {

  constructor(private httpClient: HttpClient) { }

  getAllTipoInmueble(): Observable<TipoInmueble[]>{
    return this.httpClient.get<TipoInmueble[]>('http://localhost:3000/tipoInmueble/getAll');
  }

  addTipoInmueble(tipoInmueble : TipoInmueble): Observable<TipoInmueble[]>{
    return this.httpClient.post<TipoInmueble[]>('http://localhost:3000/tipoInmueble/add',tipoInmueble);
  }

  deleteTipoInmueble(idTipoInmueble : number): Observable<TipoInmueble[]>{
    return this.httpClient.delete<TipoInmueble[]>('http://localhost:3000/tipoInmueble/delete/' + idTipoInmueble );
  }

  updateTipoInmueble(idTipoInmueble : number, descripcion: string): Observable<TipoInmueble[]>{
    return this.httpClient.put<TipoInmueble[]>('http://localhost:3000/tipoInmueble/update/' + idTipoInmueble, {descripcion});
  }

  //Acá van todas las peticiones al backend
}
