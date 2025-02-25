import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calificar-modal',
  templateUrl: 'calificar-modal.component.html',
})
export class CalificarModalComponent {
  puntuacion: number = 0;
  valoracion: string = '';

  constructor(
    private modalCtrl: ModalController
  ) {}

  onPuntuacionChange(event: any) {
    this.puntuacion = parseInt(event.detail.value, 10);
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  async submit() {
    if (this.puntuacion < 1 || this.puntuacion > 5) {
      Swal.fire('Error', 'La puntuación debe estar entre 1 y 5', 'error');
      return;
    }
    this.modalCtrl.dismiss({
      puntuacion: this.puntuacion
    });
  }
}