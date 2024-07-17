import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import TipoInmueble from 'src/app/models/TipoInmueble';

@Component({
  selector: 'app-modal-content',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">Cancelar</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="confirm()" [strong]="true">{{tipoInmueble ? 'Editar' : 'Crear'}}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
          label="Inserte el tipo de inmueble"
          labelPlacement="stacked"
          type="text"
          placeholder="Tipo de inmueble"
          [(ngModel)]="descripcion"
        ></ion-input>
      </ion-item>
    </ion-content>
  `,
})
export class ModalContentPage {
  @Input() descripcion: string = '';
  @Input() tipoInmueble!: TipoInmueble;

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    this.modalController.dismiss({ descripcion: this.descripcion });
  }
}
