import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FotosInmuebleService } from './fotos-inmueble.service';

@Injectable({
  providedIn: 'root'
})
export class CustomNavControllerService {
  constructor(private navController: NavController, private fotosInmuebleService: FotosInmuebleService) {}

  navigateForward(url: string | any[], options: any = {}) {
    this.fotosInmuebleService.updateFotosSubidas(null);
    options = { ...options, animated: false };
    this.navController.navigateForward(url, options);
  }

  navigateBack(url: string | any[], options: any = {}) {
    this.fotosInmuebleService.updateFotosSubidas(null);
    options = { ...options, animated: false };
    this.navController.navigateBack(url, options);
  }

  navigateRoot(url: string | any[], options: any = {}) {
    this.fotosInmuebleService.updateFotosSubidas(null);
    options = { ...options, animated: false };
    this.navController.navigateRoot(url, options);
  }
}