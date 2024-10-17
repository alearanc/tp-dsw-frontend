import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Inmueble from 'src/app/models/Inmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  inmueblesEncontrados: Inmueble[] = [];

  constructor(private route: ActivatedRoute, private inmuebleService: InmuebleService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['localidad']) {
        this.inmuebleService.getInmueblesByLocalidad(params['localidad']).subscribe(inmuebles => {
          this.inmueblesEncontrados = inmuebles;
        });
      }
      if (params['tipo-inmueble']) {
        this.inmuebleService.getInmueblesByTipoInmueble(params['tipo-inmueble']).subscribe(inmuebles => {
          this.inmueblesEncontrados = inmuebles;
        });
      }
    });
  }

}
