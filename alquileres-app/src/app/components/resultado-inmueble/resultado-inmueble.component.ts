import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import FotoInmueble from 'src/app/models/FotoInmueble';
import Inmueble from 'src/app/models/Inmueble';
import Reserva from 'src/app/models/Reserva';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { FotosInmuebleService } from 'src/app/services/fotos-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import Swal from 'sweetalert2';
import { CalificarModalComponent } from '../rating/calificar-modal.component';

@Component({
  selector: 'app-resultado-inmueble',
  templateUrl: './resultado-inmueble.component.html',
  styleUrls: ['./resultado-inmueble.component.scss'],
})
export class ResultadoInmuebleComponent implements OnChanges {
  @Input() inmuebleActual?: Inmueble;
  @Input() reservaActual?: Reserva;
  @Input() showDescripcion: boolean = false;
  @Input() showFechaVisita: boolean = false;
  @Input() showReservaButton: boolean = false;
  @Input() showReservaPasadaButtons: boolean = false;
  @Input() showEditButtons: boolean = false;
  @Input() fechaReserva?: Date;
  @Output() reservaCancelada = new EventEmitter<void>();

  coverPhoto: string = './assets/no-cover.jpg';
  $fotosSubidas = this.fotoInmuebleService.fotosSubidas;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: CustomNavControllerService,
    private inmuebleService: InmuebleService,
    private reservaService: ReservasService,
    private fotoInmuebleService: FotosInmuebleService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {}

  ngOnChanges() {
    if (this.inmuebleActual?.id_inmueble) {
      this.loadCoverPhoto();
    }
  }

  async calificarEstadia() {
    const modal = await this.modalCtrl.create({ component: CalificarModalComponent });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.puntuacion) {
      const reservaData = {
        id_inmueble: this.inmuebleActual!.id_inmueble,
        fecha_inicio: this.reservaActual!.fecha_inicio,
        puntuacion: data.puntuacion,
      };
      this.reservaService.valorarReserva(reservaData).subscribe({
        next: (reserva: Reserva) => {
          this.reservaActual = reserva;
          Swal.fire('Éxito', 'Tu valoración ha sido enviada', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo enviar la valoración', 'error'),
      });
    }
  }

  getCalificacionPromedio(): number {
    return this.inmuebleActual?.puntuacion_promedio || 0;
  }

  navigateToInmuebleDetails(idInmueble: number, fechaInicio?: Date, fechaFin?: Date) {
    const queryParams: any = { id: idInmueble };
    if (fechaInicio) {
      queryParams.fechaInicio = fechaInicio;
      queryParams.fechaFin = fechaFin;
    }
    this.router.navigateRoot(['/inmueble'], { queryParams });
  }

  toggleVisibilidad() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás por ${this.inmuebleActual!.habilitado ? 'ocultar' : 'mostrar'} este inmueble para los huéspedes.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar visibilidad!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inmuebleService.toggleVisibilidad(this.inmuebleActual!).subscribe((inmueble: Inmueble) => {
          this.inmuebleActual = inmueble;
        });
      }
    });
  }

  loadCoverPhoto() {
    this.fotoInmuebleService.getAllPhotosByInmueble(this.inmuebleActual!.id_inmueble).subscribe((fotos: FotoInmueble[]) => {
      if (fotos.length > 0) {
        this.coverPhoto = `http://localhost:3000/photos/${encodeURIComponent(fotos[0].urlFoto)}`;
        this.cdr.detectChanges();
      }
    });
  }

  navigateToEditInmueble() {
    this.router.navigateRoot(['/ce-inmueble'], { queryParams: { idInmueble: this.inmuebleActual!.id_inmueble } });
  }

  cancelarReserva() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás por cancelar la reserva de este inmueble.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#555',
      confirmButtonText: 'Cancelar reserva',
      cancelButtonText: 'Salir',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        let reserva: any = this.reservaActual;
        if (!reserva.huesped) {
          reserva.huesped = {}; // Asegúrate de que huesped esté definido
        }
        reserva.huesped.id_usuario = this.authService.getUserId();
        reserva.huesped.email = this.authService.getUser().email;
        this.reservaService.cancelarReserva(reserva).subscribe(() => {
          this.reservaCancelada.emit();
        });
      }
    });
  }
}