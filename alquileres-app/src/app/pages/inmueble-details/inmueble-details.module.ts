import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InmuebleDetailsPageRoutingModule } from './inmueble-details-routing.module';

import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { InmuebleDetailsPage } from './inmueble-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InmuebleDetailsPageRoutingModule,
    CustomComponentsModule,
    NgxDaterangepickerMd.forRoot({
      format: 'DD/MM/YYYY',
    })
  ],
  declarations: [InmuebleDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InmuebleDetailsPageModule {}
