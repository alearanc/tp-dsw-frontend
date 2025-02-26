import { Component, OnInit, ViewChild } from '@angular/core';
import Localidad from 'src/app/models/Localidad';
import { LocalidadService } from 'src/app/services/localidad/localidad.service'; 
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { ModalContentPage } from './modal/localidad.modal';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.page.html',
  styleUrls: ['./localidad.page.scss'],
})
export class LocalidadPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;
 
  listaLocalidad: Localidad[] = [];
  localidadSeleccionado!: Localidad;
  codigo_postal: number = 0;
  nombre: string = '';

 constructor (private localidadService: LocalidadService, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
      this.localidadService.getAllLocalidad().subscribe((localidad: Localidad[])=>{
      this.listaLocalidad = localidad;
    })
  }

  async openModal(localidad?: Localidad) {
    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        cod_postal: localidad ? localidad.cod_postal : '',
        nombre: localidad ? localidad.nombre : '',
        localidad: localidad
      }
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        if (localidad) {
          //Actualizo una Localidad
          localidad.cod_postal= data.data.cod_postal;
          localidad.nombre = data.data.nombre;
          this.localidadService.updateLocalidad(localidad.cod_postal, localidad.nombre).subscribe((localidades: Localidad[])=>{
          this.listaLocalidad = localidades;
          })
        } else {
          //Creo una Localidad
          let nuevaLocalidad = new Localidad(parseInt(data.data.cod_postal), data.data.nombre);
          this.localidadService.addLocalidad(nuevaLocalidad).subscribe((localidades: Localidad[])=>{
          this.listaLocalidad = localidades;
          })
        }
      }
    });

    return await modal.present();
  }


  async deleteLocalidad(localidad: Localidad){
      const alert = await this.alertController.create({
        header: 'Eliminar la localidad: '+ localidad.nombre + '?',
        message: 'Esta accion no puede deshacerse.',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.localidadService.deleteLocalidad(localidad.cod_postal).subscribe((localidades: Localidad[])=>{
                this.listaLocalidad = localidades;
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
