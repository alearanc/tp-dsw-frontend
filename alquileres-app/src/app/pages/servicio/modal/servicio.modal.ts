import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Servicio from 'src/app/models/Servicio';

@Component({
  selector: 'app-modal-content',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">Cancelar</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="confirm()" [strong]="true">{{servicio ? 'Editar' : 'Crear'}}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="Inserte el servicio"
          labelPlacement="stacked"
          type="text"
          placeholder="Servicio"
          [(ngModel)]="descripcion_servicio"
        ></ion-input>
      </ion-item>
    </ion-content>
  `,
})
export class ModalContentPage {
  @Input() servicio!: Servicio;
  @Input() descripcion_servicio: string = '';

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    this.modalController.dismiss({ descripcion_servicio: this.descripcion_servicio });
  }
}
