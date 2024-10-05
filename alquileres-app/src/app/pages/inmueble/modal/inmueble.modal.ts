import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import Inmueble from 'src/app/models/Inmueble';
import Localidad from 'src/app/models/Localidad';
import TipoInmueble from 'src/app/models/TipoInmueble';
import { TipoInmubeleService } from 'src/app/services/tipo-inmueble/tipo-inmubele.service';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';

@Component({
  selector: 'app-modal-content',
  templateUrl: './inmueble.modal.html',
})

export class ModalContentPage implements OnInit {
  @Input() titulo_inmueble: string = '';
  @Input() descripcion_inmueble: string = '';
  @Input() precio_noche: number = 0;
  @Input() direccion_inmueble: string = '';
  @Input() capacidad: number = 0;
  @Input() cod_postal!: number;
  @Input() id_tipoinmueble!: number;
  @Input() id_propietario!: number;
  @Input() inmueble!: Inmueble;

  localidades: Localidad[] = [];
  tiposInmueble: TipoInmueble[] = [];

  constructor(
    private modalController: ModalController,
    private localidadService: LocalidadService,
    private tipoInmuebleService: TipoInmubeleService
  ) {}

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos() {
    this.localidadService.getAllLocalidad().subscribe((data) => this.localidades = data);
    this.tipoInmuebleService.getAllTipoInmueble().subscribe((data) => this.tiposInmueble = data);
  }

  cancel() {
    this.modalController.dismiss();
  }

  confirm() {
    const data = {
      titulo_inmueble: this.titulo_inmueble,
      descripcion_inmueble: this.descripcion_inmueble,
      precio_noche: this.precio_noche,
      direccion_inmueble: this.direccion_inmueble,
      capacidad: this.capacidad,
      cod_postal: this.cod_postal,
      id_tipoinmueble: this.id_tipoinmueble,
      id_propietario: this.id_propietario,
    };

    this.modalController.dismiss(data);
  }
}
