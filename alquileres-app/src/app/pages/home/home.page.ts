import { Component, OnInit } from '@angular/core';
import { Inmueble } from 'src/app/models/Inmueble';
import Localidad from 'src/app/models/Localidad';
import TipoInmueble from 'src/app/models/TipoInmueble';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  inmuebles: Inmueble[] = [];

  inmuebleTest = new Inmueble("Casa de campo", "Casa de campo con todas las comodidades del universo. Con esto seguro aprobamos!", 1000, "Avenida siempre viva 123", 50, new TipoInmueble("Casas"),new Localidad(2000, "Rosario"), 1);

  constructor() { }

  ngOnInit() {
  }

}
