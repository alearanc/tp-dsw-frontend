import { Component, OnInit } from '@angular/core';
import Inmueble from 'src/app/models/Inmueble';
import Localidad from 'src/app/models/Localidad';
import TipoInmueble from 'src/app/models/TipoInmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  inmuebles: Inmueble[] = [];

  constructor(private inmueblesService: InmuebleService) { }

  ngOnInit() {
    this.inmueblesService.getAllInmuebles().subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
    });
  }

}
