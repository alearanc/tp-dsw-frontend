import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Localidad } from 'src/app/models/Localidad';
import { TipoInmueble } from 'src/app/models/TipoInmueble';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';
import { TipoInmubeleService } from 'src/app/services/tipo-inmueble/tipo-inmubele.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  localidades: Localidad[] = [];
  tipoInmuebles: TipoInmueble[] = [];
  type!: string;

  constructor(private route: ActivatedRoute, private localidadService: LocalidadService, private tipoInmuebleService: TipoInmubeleService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.type = params['localidades'] ? 'localidad' : 'tipo-inmueble';
      if (this.type === 'localidad') {
        this.getLocalidades();
      } else {
        this.getTipoInmuebles();
      }
    });
  }

  getLocalidades(){
    this.localidadService.getAllLocalidad().subscribe((localidades: Localidad[]) => {
      this.localidades = localidades;
    });
  }

  getTipoInmuebles(){
    this.tipoInmuebleService.getAllTipoInmueble().subscribe((tipoInmuebles: TipoInmueble[]) => {
      this.tipoInmuebles = tipoInmuebles;
    });
  }

  trackByCategoria(index: number, item: Localidad | TipoInmueble): number {
    // Si tiene cod_postal, asumimos que es Localidad
    if ('cod_postal' in item) {
      return (item as Localidad).cod_postal;
    }
    // Si no, asumimos que es TipoInmueble
    return (item as TipoInmueble).id_tipoinmueble;
  }

}
