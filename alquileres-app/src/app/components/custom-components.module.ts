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

@NgModule({
  declarations: [HeaderComponent, PopoverContentComponent, FooterComponent, BuscadorComponent, ResultadoInmuebleComponent, RatingComponent],
  imports: [CommonModule, IonicModule.forRoot(), ReactiveFormsModule],
  exports: [HeaderComponent, PopoverContentComponent, FooterComponent, BuscadorComponent, ResultadoInmuebleComponent, RatingComponent]
})
export class CustomComponentsModule {}