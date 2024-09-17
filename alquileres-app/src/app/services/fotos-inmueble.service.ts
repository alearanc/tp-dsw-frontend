import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import FotoInmueble from '../models/FotoInmueble';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FotosInmuebleService {

  constructor(private httpClient: HttpClient) { }

  getAllPhotosByInmueble(idInmueble: number): Observable<FotoInmueble[]>{
    return this.httpClient.get<FotoInmueble[]>('http://localhost:3000/photos/get/' + idInmueble);
  }

  deletePhotoById(idFotoInmueble: number): Observable<void>{
    return this.httpClient.delete<void>('http://localhost:3000/photos/' + idFotoInmueble);
  }

  uploadPhotos(inmuebleId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('uploadedImages', file);
    });
    
    return this.httpClient.post(`http://localhost:3000/photos/add/${inmuebleId}`, formData);
  }

}
