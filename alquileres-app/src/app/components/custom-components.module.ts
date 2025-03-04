import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Importa RouterModule directamente
import { BuscadorComponent } from './buscador/buscador.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { InmuebleServicioComponent } from './inmueble-servicio/inmueble-servicio.component';
import { LinkComponent } from './link/link.component';
import { PhotoElementComponent } from './photo-element/photo-element.component';
import { PhotosComponentComponent } from './photos-component/photos-component.component';
import { RatingComponent } from './rating/rating.component';
import { ResultadoInmuebleComponent } from './resultado-inmueble/resultado-inmueble.component';
import { ListadoInmueblesRecientesComponent } from './listado-inmuebles-recientes/listado-inmuebles-recientes.component';
import { HeroRegistrarseComponent } from './hero-registrarse/hero-registrarse.component';
import { HeroBuscadorComponent } from './hero-buscador/hero-buscador.component';
import { PopoverContentComponent } from './header/popover-content.component';
import { AvatarComponent } from './avatar/avatar.component';
import { InmuebleFormComponent } from './inmueble-form/inmueble-form.component';

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
    AvatarComponent,
    InmuebleFormComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    RouterModule,
  ],
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
    AvatarComponent,
    InmuebleFormComponent
  ],
})
export class CustomComponentsModule {}