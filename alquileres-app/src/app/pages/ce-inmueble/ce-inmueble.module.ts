import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CEInmueblePageRoutingModule } from './ce-inmueble-routing.module';

import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { CEInmueblePage } from './ce-inmueble.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CEInmueblePageRoutingModule,
    ReactiveFormsModule,
    CustomComponentsModule
  ],
  declarations: [CEInmueblePage]
})
export class CEInmueblePageModule {}
