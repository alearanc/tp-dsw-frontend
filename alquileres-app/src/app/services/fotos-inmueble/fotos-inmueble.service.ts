import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { FotoInmueble } from '../../models/FotoInmueble';

@Injectable({
  providedIn: 'root'
})
export class FotosInmuebleService {

  private fotosSubidasSignal = signal<FotoInmueble[] | null>(null);
  readonly fotosSubidas = this.fotosSubidasSignal.asReadonly();

  constructor(private httpClient: HttpClient) { }

  getAllPhotosByInmueble(idInmueble: number): Observable<FotoInmueble[]>{
    return this.httpClient.get<FotoInmueble[]>('photos/get/' + idInmueble);
  }

  deletePhotoById(idFotoInmueble: number): Observable<void>{
    return this.httpClient.delete<void>('photos/' + idFotoInmueble);
  }

  uploadPhotos(inmuebleId: number, files: File[]): Observable<any> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('uploadedImages', file);
    });
    
    return this.httpClient.post(`photos/add/${inmuebleId}`, formData);
  }

  updateFotosSubidas(fotos: FotoInmueble[] | null){
    this.fotosSubidasSignal.update(() => fotos);
  }

}
