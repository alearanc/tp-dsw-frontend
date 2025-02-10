import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageInmueblesPageRoutingModule } from './manage-inmuebles-routing.module';

import { ManageInmueblesPage } from './manage-inmuebles.page';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageInmueblesPageRoutingModule,
    NgxDaterangepickerMd.forRoot({
      format: 'DD/MM/YYYY'
    }),
  ],
  declarations: [ManageInmueblesPage]
})
export class ManageInmueblesPageModule {}
