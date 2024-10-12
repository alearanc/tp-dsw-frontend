// custom-components.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent, PopoverContentComponent } from './header/header.component';

import { BuscadorComponent } from './buscador/buscador.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultadoInmuebleComponent } from './resultado-inmueble/resultado-inmueble.component';
import { RatingComponent } from './rating/rating.component';
import { InmuebleServicioComponent } from './inmueble-servicio/inmueble-servicio.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, PopoverContentComponent, FooterComponent, BuscadorComponent, ResultadoInmuebleComponent, RatingComponent, InmuebleServicioComponent],
  imports: [CommonModule, IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
  exports: [HeaderComponent, PopoverContentComponent, FooterComponent, BuscadorComponent, ResultadoInmuebleComponent, RatingComponent, InmuebleServicioComponent]
})
export class CustomComponentsModule {}
