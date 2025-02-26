import { ChangeDetectorRef, Component, computed, effect, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FotoInmueble } from 'src/app/models/FotoInmueble';
import { Inmueble } from 'src/app/models/Inmueble';
import { Reserva } from 'src/app/models/Reserva';
import { TipoUsuario } from 'src/app/models/TipoUsuario.enum';
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
export class ResultadoInmuebleComponent {
  inmuebleActual = input<Inmueble | undefined>();
  @Input() reservaActual?: Reserva;
  @Input() showDescripcion: boolean = false;
  @Input() showFechaVisita: boolean = false;
  @Input() showReservaButton: boolean = false;
  @Input() showReservaPasadaButtons: boolean = false;
  @Input() showEditButtons: boolean = false;
  @Input() fechaReserva?: Date;
  @Output() reservaCancelada = new EventEmitter<void>();

  // Signal para las fotos específicas del inmueble
  private fotos = signal<FotoInmueble[] | null>(null);

  // coverPhoto como Signal computado
  coverPhoto = computed(() => {
    const fotosSubidas = this.$fotosSubidas();
    const fotosLocal = this.fotos();
    const inmueble = this.inmuebleActual();

    if (!inmueble?.id_inmueble) return './assets/no-cover.jpg';

    // Priorizo fotosSubidas si coincidenn cn el inmueble
    if (fotosSubidas && fotosSubidas.length > 0 && fotosSubidas[0].inmuebleId === inmueble.id_inmueble) {
      return `http://localhost:3000/photos/${encodeURIComponent(fotosSubidas[0].urlFoto)}`;
    }

    // Luego uso las fotos csrgadas localmente
    if (fotosLocal && fotosLocal.length > 0) {
      return `http://localhost:3000/photos/${encodeURIComponent(fotosLocal[0].urlFoto)}`;
    }

    return './assets/no-cover.jpg';
  });

  $fotosSubidas = this.fotoInmuebleService.fotosSubidas;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: CustomNavControllerService,
    private inmuebleService: InmuebleService,
    private reservaService: ReservasService,
    private fotoInmuebleService: FotosInmuebleService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) {
    effect(() => {
      const inmueble = this.inmuebleActual();
      if (inmueble?.id_inmueble) {
        this.loadInitialPhotos(inmueble.id_inmueble);
      } else {
        this.fotos.set(null);
      }
    });
  }

  // Cargo las fotos iniciales
  private loadInitialPhotos(idInmueble: number) {
    this.fotoInmuebleService.getAllPhotosByInmueble(idInmueble).subscribe((fotos: FotoInmueble[]) => {
      this.fotos.set(fotos);
    });
  }

  async calificarEstadia() {
    const modal = await this.modalCtrl.create({ component: CalificarModalComponent });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data?.puntuacion && this.inmuebleActual() && this.reservaActual?.fecha_inicio) {
      const reservaData = {
        id_inmueble: this.inmuebleActual()!.id_inmueble,
        fecha_inicio: this.reservaActual.fecha_inicio,
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
    return this.inmuebleActual()?.puntuacion_promedio || 0;
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
    const inmueble = this.inmuebleActual();
    if (!inmueble) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Estás por ${inmueble.habilitado ? 'ocultar' : 'mostrar'} este inmueble para los huéspedes.`,
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar visibilidad!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.inmuebleService.toggleVisibilidad(inmueble).subscribe((updatedInmueble: Inmueble) => {
          this.cdr.detectChanges();
        });
      }
    });
  }

  navigateToEditInmueble() {
    const inmueble = this.inmuebleActual();
    if (inmueble?.id_inmueble) {
      this.router.navigateRoot(['/ce-inmueble'], { queryParams: { idInmueble: inmueble.id_inmueble } });
    }
  }

  cancelarReserva() {
    if (!this.reservaActual) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás por cancelar la reserva de este inmueble.',
      icon: 'warning',
      showCancelButton: true,
      heightAuto: false,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#555',
      confirmButtonText: 'Cancelar reserva',
      cancelButtonText: 'Salir',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const usuario = this.authService.getUser();
        const reserva: Reserva = {
          ...this.reservaActual!, // Uso ! porque ya verifiqué que no es undefined
          huesped: {
            id_usuario: this.authService.getUserId(),
            email: usuario.email,
            nombre: usuario.nombre || 'Usuario',
            apellido: usuario.apellido || 'Desconocido',
            password: usuario.password || '',
            tipo_usuario: usuario.tipo_usuario || TipoUsuario.Huesped,
            telefono: usuario.telefono || 'No especificado',
            domicilio: usuario.domicilio || 'No especificado',
          },
        };
        this.reservaService.cancelarReserva(reserva).subscribe({
          next: () => {
            this.reservaCancelada.emit();
            Swal.fire('Éxito', 'La reserva fue cancelada', 'success');
          },
          error: () => Swal.fire('Error', 'No se pudo cancelar la reserva', 'error'),
        });
      }
    });
  }
}