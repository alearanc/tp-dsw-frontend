import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Persona from '../../models/Persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private httpClient: HttpClient) { }

  getAllPersona(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>('persona/get');
  }

  getPersonaByid_usuario(id_usuario:number): Observable<Persona>{
    return this.httpClient.get<Persona>('persona/get/' + id_usuario );
  }

  addPersona(persona: Persona): Observable<Persona>{
    return this.httpClient.post<Persona>('persona/add',persona);
  }

  deletePersonaByid_usuario(id_usuario: number): Observable<Persona>{
    return this.httpClient.delete<Persona>('persona/delete/' + id_usuario );
  }

  updatePersona(persona: Persona): Observable<Persona> {
    const { id_usuario, nombre, apellido, email, password, tipo_usuario, telefono, domicilio } = persona;
    return this.httpClient.put<Persona>('persona/update/' + id_usuario, {
      nombre,
      apellido,
      email,
      password,
      tipo_usuario,
      telefono,
      domicilio
    });
  }

  recoverAccount(email: string): Observable<any> {
    return this.httpClient.post(`persona/recover_account`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.httpClient.post(`persona/reset_password`, { token, newPassword });
  }
}