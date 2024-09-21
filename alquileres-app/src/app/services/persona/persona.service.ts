import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Persona from '../../models/Persona'

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private httpClient: HttpClient) { }

  getAllPersona(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>('http://localhost:3000/persona/get');
  }

  getPersonaByid_usuario(id_usuario:number): Observable<Persona>{
    return this.httpClient.get<Persona>('http://localhost:3000/persona/get/' + id_usuario );
  }

  addPersona(persona: Persona): Observable<Persona>{
    return this.httpClient.post<Persona>('http://localhost:3000/persona/add',persona);
  }

  deletePersonaByid_usuario(id_usuario: number): Observable<Persona>{
    return this.httpClient.delete<Persona>('http://localhost:3000/persona/delete/' + id_usuario );
  }

  updatePersona(persona: Persona): Observable<Persona> {
    const { id_usuario, nombre, apellido, email, password, tipo_usuario, telefono, domicilio } = persona;
    return this.httpClient.put<Persona>('http://localhost:3000/persona/update/' + id_usuario, {
      nombre,
      apellido,
      email,
      password,
      tipo_usuario,
      telefono,
      domicilio
    });
    
  }
  
  //Acá van todas las peticiones al backend
}
