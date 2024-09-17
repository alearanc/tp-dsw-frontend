import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Inmueble from '../models/Inmueble';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {

  constructor(private httpClient: HttpClient) { }

  getAllInmueble(): Observable<Inmueble[]>{
    return this.httpClient.get<Inmueble[]>('http://localhost:3000/inmueble/get');
  }
}
