import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InmueblePageRoutingModule } from './inmueble-routing.module';

import { InmueblePage } from './inmueble.page';
import { ModalContentPage } from './modal/inmueble.modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InmueblePageRoutingModule
  ],
  declarations: [InmueblePage, ModalContentPage],
})
export class InmueblePageModule {}
