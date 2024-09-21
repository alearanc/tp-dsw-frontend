import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Persona from 'src/app/models/Persona';
import { TipoUsuario } from 'src/app/models/TipoUsuario.enum';

@Component({
  selector: 'app-modal-content',
  template: `
      <ion-header>
        <ion-toolbar>
          <!-- <ion-title>{{ persona ? 'Editar Persona' : 'Crear Persona' }}</ion-title> -->
          <ion-buttons slot="start">
            <ion-button (click)="cancel()">Cancelar</ion-button>
          </ion-buttons>
          <ion-buttons slot="end">
            <ion-button (click)="confirm()">{{ persona ? 'Editar' : 'Crear' }}</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-item>
          <ion-label position="stacked">Nombre</ion-label>
          <ion-input [(ngModel)]="nombre"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Apellido</ion-label>
          <ion-input [(ngModel)]="apellido"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Domicilio</ion-label>
          <ion-input [(ngModel)]="domicilio"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Email</ion-label>
          <ion-input [(ngModel)]="email" type="email"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Teléfono</ion-label>
          <ion-input [(ngModel)]="telefono"></ion-input>
        </ion-item>

        <ion-item>
          <ion-label position="stacked">Tipo de Usuario</ion-label>
          <ion-select [(ngModel)]="tipoUsuario">
            <ion-select-option value="Huesped">Huesped</ion-select-option>
            <ion-select-option value="Propietario">Propietario</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-content>
  `,
})
export class ModalContentPage {
  id_usuario!: number;
  @Input() nombre: string= '';
  @Input() apellido: string = '';
  @Input() email: string = '';
  @Input() telefono: string = '';
  @Input() domicilio: string = ''
  @Input() tipoUsuario!: TipoUsuario;
  @Input() persona!: Persona;

  constructor(private modalController: ModalController) {}

  cancel() {
    this.modalController.dismiss();
  }

  confirm() { 
    this.modalController.dismiss({      
      persona: this.persona,
      id_usuario: this.id_usuario,
      nombre: this.nombre, 
      apellido: this.apellido, 
      email: this.email, 
      telefono: this.telefono,
      domicilio: this.domicilio,
      tipo_usuario: this.tipoUsuario
    });
  }
}

