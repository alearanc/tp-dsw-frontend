import { Component, OnInit, ViewChild } from '@angular/core';
import { TipoInmueble } from 'src/app/models/TipoInmueble';
import { TipoInmubeleService } from 'src/app/services/tipo-inmueble/tipo-inmubele.service';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
import { ModalContentPage } from './modal/tipo-inmueble.modal';

@Component({
  selector: 'app-tipo-inmueble',
  templateUrl: './tipo-inmueble.page.html',
  styleUrls: ['./tipo-inmueble.page.scss'],
})
export class TipoInmueblePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  listaTipoInmueble: TipoInmueble[] = [];
  tipoInmuebleSeleccionado!: TipoInmueble;
  descripcion: string = '';

  constructor(private tipoInmuebleService: TipoInmubeleService, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {
    this.tipoInmuebleService.getAllTipoInmueble().subscribe((tiposInmueble: TipoInmueble[])=>{
      this.listaTipoInmueble = tiposInmueble;
    })
  }

  async openModal(tipoInmueble?: TipoInmueble) {
    const modal = await this.modalController.create({
      component: ModalContentPage,
      componentProps: {
        descripcion: tipoInmueble ? tipoInmueble.descripcion : '',
        tipoInmueble: tipoInmueble
      }
    });

    modal.onDidDismiss().then((data: any) => {
      if (data.data) {
        if (tipoInmueble) {
          //Actualizo un TipoInmueble
          tipoInmueble.descripcion = data.data.descripcion;
          this.tipoInmuebleService.updateTipoInmueble(tipoInmueble.id_tipoinmueble, tipoInmueble.descripcion).subscribe((tiposInmueble: TipoInmueble[])=>{
            this.listaTipoInmueble = tiposInmueble;
          })
        } else {
          //Creo un TipoInmueble
          let nuevoTipoInmueble = {
            descripcion: data.data.descripcion
          };
          this.tipoInmuebleService.addTipoInmueble(nuevoTipoInmueble).subscribe((tiposInmueble: TipoInmueble[])=>{
            this.listaTipoInmueble = tiposInmueble;
          })
        }
      }
    });

    return await modal.present();
  }


  async deleteTipoInmueble(tipoInmueble: TipoInmueble){
      const alert = await this.alertController.create({
        header: 'Eliminar ' + tipoInmueble.descripcion + '?',
        message: 'Esta accion no puede deshacerse.',
        buttons: [
          {
            text: 'Cancelar',
          },
          {
            text: 'Eliminar',
            handler: () => {
              this.tipoInmuebleService.deleteTipoInmueble(tipoInmueble.id_tipoinmueble).subscribe((tiposInmueble: TipoInmueble[])=>{
                this.listaTipoInmueble = tiposInmueble;
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
