import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Localidad from '../../models/Localidad';

@Injectable({
  providedIn: 'root'
})
export class LocalidadService {

  constructor(private httpClient: HttpClient) { }

  getAllLocalidad(): Observable<Localidad[]>{
    return this.httpClient.get<Localidad[]>('localidad/getAll');
  }

  addLocalidad(localidad : Localidad): Observable<Localidad[]>{
    return this.httpClient.post<Localidad[]>('localidad/add',localidad);
  }

  deleteLocalidad(cod_postal : number): Observable<Localidad[]>{
    return this.httpClient.delete<Localidad[]>('localidad/delete/' + cod_postal );
  }

  updateLocalidad(cod_postal : number, nombre: string): Observable<Localidad[]>{
    return this.httpClient.put<Localidad[]>('localidad/update/' + cod_postal, {nombre});
  }

  //Acá van todas las peticiones al backend
}
