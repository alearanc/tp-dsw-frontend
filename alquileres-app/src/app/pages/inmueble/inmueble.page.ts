import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import Inmueble from 'src/app/models/Inmueble';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ModalContentPage } from './modal/inmueble.modal';

@Component({
  selector: 'app-inmueble',
  templateUrl: './inmueble.page.html',
  styleUrls: ['./inmueble.page.scss'],
})
export class InmueblePage implements OnInit {
  listaInmuebles: Inmueble[] = [];

  constructor(
    private inmuebleService: InmuebleService,
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.obtenerInmuebles();
  }

  obtenerInmuebles() {
    this.inmuebleService
      .getAllInmuebles()
      .subscribe((inmuebles: Inmueble[]) => {
        this.listaInmuebles = inmuebles;
      });
  }

  trackByInmueble(index: number, inmueble: Inmueble): number {
    return inmueble.id_inmueble!;
  }

  async openModal(inmueble?: any) {
    console.log(inmueble)
    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        titulo_inmueble: inmueble ? inmueble.titulo_inmueble : '',
        descripcion_inmueble: inmueble ? inmueble.descripcion_inmueble : '',
        precio_noche: inmueble ? inmueble.precio_noche : 0,
        direccion_inmueble: inmueble ? inmueble.direccion_inmueble : '',
        capacidad: inmueble ? inmueble.capacidad : 0,
        id_tipoinmueble: inmueble ? inmueble.id_tipoinmueble : null,
        cod_postal: inmueble ? inmueble.cod_postal : null,
        id_propietario: inmueble ? inmueble.propietario : null,
        inmueble: inmueble,
      },
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        if (inmueble) {
          Object.assign(inmueble, data.data);
          inmueble.tipoinmueble = { id_tipoinmueble: data.data.id_tipoinmueble};
          inmueble.localidad = { cod_postal: data.data.cod_postal};
          this.inmuebleService.updateInmueble(inmueble.id_inmueble!, inmueble).subscribe(() => {
            this.obtenerInmuebles();
          }); 
        } else {
          //  Crear nuevo inmueble
          const nuevoInmueble = new Inmueble(
            data.data.titulo_inmueble,
            data.data.descripcion_inmueble,
            data.data.precio_noche,
            data.data.direccion_inmueble,
            data.data.capacidad,
            { id_tipoinmueble: data.data.id_tipoinmueble, descripcion: ''},
            { cod_postal: data.data.cod_postal, nombre: '' },
            data.data.id_propietario
          );
          this.inmuebleService.addInmueble(nuevoInmueble).subscribe(() => {
            this.obtenerInmuebles();
          });
        }
      }
    });

    return await modal.present();
  }

  async deleteInmueble(inmueble: Inmueble) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro que deseas eliminar este inmueble?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.inmuebleService.deleteInmueble(inmueble.id_inmueble!).subscribe(() => {
              this.obtenerInmuebles();
            })
          }
        }
      ],
    });
    await alert.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
