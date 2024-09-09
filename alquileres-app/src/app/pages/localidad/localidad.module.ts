import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalidadPageRoutingModule } from './localidad-routing.module';

import { LocalidadPage } from './localidad.page';
import { ModalContentPage } from './modal/localidad.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalidadPageRoutingModule
  ],
  declarations: [LocalidadPage, ModalContentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LocalidadPageModule {}
