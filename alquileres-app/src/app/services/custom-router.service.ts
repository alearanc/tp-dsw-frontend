import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CustomNavControllerService {
  constructor(private navController: NavController) {}

  navigateForward(url: string | any[], options: any = {}) {
    options = { ...options, animated: false };
    this.navController.navigateForward(url, options);
  }

  navigateBack(url: string | any[], options: any = {}) {
    options = { ...options, animated: false };
    this.navController.navigateBack(url, options);
  }

  navigateRoot(url: string | any[], options: any = {}) {
    options = { ...options, animated: false };
    this.navController.navigateRoot(url, options);
  }
}