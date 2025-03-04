import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoInmueble } from '../../models/TipoInmueble';

@Injectable({
  providedIn: 'root'
})
export class TipoInmubeleService {

  constructor(private httpClient: HttpClient) { }

  getAllTipoInmueble(): Observable<TipoInmueble[]>{
    return this.httpClient.get<TipoInmueble[]>('tipoInmueble/getAll');
  }

  addTipoInmueble(tipoInmueble : any): Observable<TipoInmueble[]>{
    return this.httpClient.post<TipoInmueble[]>('tipoInmueble/add',tipoInmueble);
  }

  deleteTipoInmueble(idTipoInmueble : number): Observable<TipoInmueble[]>{
    return this.httpClient.delete<TipoInmueble[]>('tipoInmueble/delete/' + idTipoInmueble );
  }

  updateTipoInmueble(idTipoInmueble : number, descripcion: string): Observable<TipoInmueble[]>{
    return this.httpClient.put<TipoInmueble[]>('tipoInmueble/update/' + idTipoInmueble, {descripcion});
  }
}
