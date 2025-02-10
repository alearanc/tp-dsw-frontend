import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Inmueble from 'src/app/models/Inmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  inmueblesEncontrados: Inmueble[] = [];
  title: string = 'Resultados de búsqueda'

  constructor(private route: ActivatedRoute, private inmuebleService: InmuebleService, private localidadService: LocalidadService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['localidad']) {
        const zipCode = params['localidad']
        this.localidadService.getLocalidad(zipCode).subscribe(localidad => {
          if (localidad) {
            this.title = `Alojamientos en ${localidad.nombre}`
          } 
        })

        this.inmuebleService.getInmueblesByLocalidad(params['localidad']).subscribe(inmuebles => {
          this.inmueblesEncontrados = inmuebles;
        });
      }

      if (params['tipo-inmueble']) {
        this.inmuebleService.getInmueblesByTipoInmueble(params['tipo-inmueble']).subscribe(inmuebles => {
          this.inmueblesEncontrados = inmuebles;
        });
      }
      if (params['criteria']) {
        this.inmuebleService.searchInmuebles(params['criteria']).subscribe(inmuebles => {
          console.log(inmuebles)
          this.inmueblesEncontrados = inmuebles;
        });
      }
    });
  }

}
