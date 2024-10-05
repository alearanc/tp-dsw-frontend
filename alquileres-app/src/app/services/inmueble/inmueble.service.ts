import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Inmueble from 'src/app/models/Inmueble';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InmuebleService {
  private apiUrl = 'http://localhost:3000/inmueble';

  constructor(private http: HttpClient) { }

  addInmueble(inmueble: Inmueble): Observable<Inmueble> {
    return this.http.post<Inmueble>(`${this.apiUrl}/add`, inmueble);
  }

  getAllInmuebles(): Observable<Inmueble[]> {
    return this.http.get<Inmueble[]>(`${this.apiUrl}/get`);
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
