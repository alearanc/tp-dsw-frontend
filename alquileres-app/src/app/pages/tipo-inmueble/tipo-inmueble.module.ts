import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TipoInmueblePageRoutingModule } from './tipo-inmueble-routing.module';

import { TipoInmueblePage } from './tipo-inmueble.page';
import { ModalContentPage } from './modal/tipo-inmueble.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TipoInmueblePageRoutingModule
  ],
  declarations: [TipoInmueblePage, ModalContentPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TipoInmueblePageModule {}
