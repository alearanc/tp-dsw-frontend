import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicioPageRoutingModule } from './servicio-routing.module';

import { ServicioPage } from './servicio.page';
import { ModalContentPage } from './modal/servicio.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicioPageRoutingModule
  ],
  declarations: [ServicioPage, ModalContentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicioPageModule {}
