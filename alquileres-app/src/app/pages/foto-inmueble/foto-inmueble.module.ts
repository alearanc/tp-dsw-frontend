import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FotoInmueblePageRoutingModule } from './foto-inmueble-routing.module';

import { FotoInmueblePage } from './foto-inmueble.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FotoInmueblePageRoutingModule
  ],
  declarations: [FotoInmueblePage]
})
export class FotoInmueblePageModule {}
