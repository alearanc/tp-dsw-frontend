import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Localidad from 'src/app/models/Localidad';

@Component({
  selector: 'app-modal-content',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button (click)="cancel()">Cancelar</ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button (click)="confirm()" [strong]="true">{{localidad ? 'Editar' : 'Crear'}}</ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-item>
        <ion-input
            label="Inserte el codigo postal de la Localidad"
            labelPlacement="stacked"
            type="text"
            placeholder="Cod. Postal"
            [(ngModel)]="cod_postal"
          ></ion-input>
        <ion-input
            label="Inserte el nombre de la Localidad"
            labelPlacement="stacked"
            type="text"
            placeholder="Localidad"
            [(ngModel)]="nombre"
          ></ion-input>
      </ion-item>
    </ion-content>
  `,
})
export class ModalContentPage {
  @Input() cod_postal!: number;
  @Input() nombre: string = '';
  @Input() localidad!: Localidad;

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    this.modalController.dismiss({cod_postal: this.cod_postal, nombre: this.nombre });
  }
}
