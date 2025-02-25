// custom-components.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BuscadorComponent } from './buscador/buscador.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent, PopoverContentComponent } from './header/header.component';
import { InmuebleServicioComponent } from './inmueble-servicio/inmueble-servicio.component';
import { LinkComponent } from './link/link.component';
import { PhotoElementComponent } from './photo-element/photo-element.component';
import { PhotosComponentComponent } from './photos-component/photos-component.component';
import { RatingComponent } from './rating/rating.component';
import { ResultadoInmuebleComponent } from './resultado-inmueble/resultado-inmueble.component';
import { ListadoInmueblesRecientesComponent } from './listado-inmuebles-recientes/listado-inmuebles-recientes.component';
import { HeroRegistrarseComponent } from './hero-registrarse/hero-registrarse.component';
import { HeroBuscadorComponent } from './hero-buscador/hero-buscador.component';

@NgModule({
  declarations: [
    HeaderComponent,
    PopoverContentComponent,
    FooterComponent,
    BuscadorComponent,
    ResultadoInmuebleComponent,
    RatingComponent,
    PhotoElementComponent,
    PhotosComponentComponent,
    InmuebleServicioComponent,
    LinkComponent,
    ListadoInmueblesRecientesComponent,
    HeroRegistrarseComponent,
    HeroBuscadorComponent,
  ],
  imports: [CommonModule, IonicModule.forRoot(), ReactiveFormsModule],
  exports: [
    HeaderComponent,
    PopoverContentComponent,
    FooterComponent,
    BuscadorComponent,
    ResultadoInmuebleComponent,
    RatingComponent,
    PhotoElementComponent,
    PhotosComponentComponent,
    InmuebleServicioComponent,
    LinkComponent,
    ListadoInmueblesRecientesComponent,
    HeroRegistrarseComponent,
    HeroBuscadorComponent,
  ]
})
export class CustomComponentsModule {}