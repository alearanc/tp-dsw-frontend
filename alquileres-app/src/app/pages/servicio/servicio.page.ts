import { Component, OnInit, ViewChild } from '@angular/core';
import Servicio from 'src/app/models/Servicio';
import { ServicioService } from 'src/app/services/servicio/servicio.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { ModalContentPage } from './modal/servicio.modal';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  listaServicio: Servicio[] = [];
  tipoServicioSeleccionado!: Servicio;
  descripcion: string = '';

  constructor(private servicioService: ServicioService, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
      this.servicioService.getAllServicio().subscribe((servicios: Servicio[])=>{
      this.listaServicio = servicios;
      //console.log(this.listaServicio);
    })
  }

  async openModal(servicio?: Servicio) {
    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        descripcion_servicio: servicio ? servicio.descripcion_servicio : '',
        servicio: servicio
      }
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        if (servicio) {
          //Actualizo un Servicio
          servicio.descripcion_servicio = data.data.descripcion_servicio;
          this.servicioService.updateServicio(servicio.id_servicio, servicio.descripcion_servicio).subscribe((servicios: Servicio[])=>{
            this.listaServicio = servicios;
          })
        } else {
          //Creo un Servicio
          let nuevoServicio = new Servicio(data.data.descripcion_servicio);
          this.servicioService.addServicio(nuevoServicio).subscribe((servicios: Servicio[])=>{
            this.listaServicio = servicios;
          })
        }
      }
    });

    return await modal.present();
  }


  async deleteTipoInmueble(servicio: Servicio){
      const alert = await this.alertController.create({
        header: 'Eliminar ' + servicio.descripcion_servicio + '?',
        message: 'Esta accion no puede deshacerse.',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.servicioService.deleteServicio(servicio.id_servicio).subscribe((servicios: Servicio[])=>{
                this.listaServicio = servicios;
                //console.log(this.listaServicio);
              })
            },
          },
        ],
      });
  
      await alert.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
  }
}
