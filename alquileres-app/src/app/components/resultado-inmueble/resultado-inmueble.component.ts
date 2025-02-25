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
export class ResultadoInmuebleComponent  implements OnChanges {
  
  @Input() inmuebleActual!: Inmueble;
  @Input() reservaActual!: Reserva;
  @Input() showDescripcion: boolean = false;
  @Input() showFechaVisita: boolean = false;
  @Input() showReservaButton: boolean = false;
  @Input() showReservaPasadaButtons: boolean = false;
  @Input() showEditButtons!: boolean;
  @Input() fechaReserva!: Date;
  @Output() reservaCancelada: EventEmitter<void> = new EventEmitter();
  coverPhoto: string = "./assets/no-cover.jpg";
  $fotosSubidas = this.fotoInmuebleService.fotosSubidas;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: CustomNavControllerService,
    private inmuebleService: InmuebleService,
    private reservaService: ReservasService,
    private fotoInmuebleService: FotosInmuebleService,
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnChanges() {
    if(this.inmuebleActual.id_inmueble){
      this.loadCoverPhoto();
    }
  }

  async calificarEstadia() {
    const modal = await this.modalCtrl.create({
      component: CalificarModalComponent,
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      const { puntuacion } = data;
      const reservaData = {
        id_inmueble: this.inmuebleActual.id_inmueble,
        fecha_inicio: this.reservaActual.fecha_inicio,
        puntuacion,
      };

      this.reservaService.valorarReserva(reservaData).subscribe({
        next: (reserva: Reserva) => {
          this.reservaActual = reserva; // Actualiza la reserva localmente
          Swal.fire('Éxito', 'Tu valoración ha sido enviada', 'success');
        },
        error: (err) => Swal.fire('Error', 'No se pudo enviar la valoración', 'error'),
      });
    }
  }

  getCalificacionPromedio() {
    return this.inmuebleActual.puntuacion_promedio || 0; // Usamos el promedio del inmueble
  }

  navigateToInmuebleDetails(id_inmueble: number, fecha_inicio?: Date, fecha_fin?: Date){
    if(fecha_inicio){
      this.router.navigateRoot(['/inmueble'], { queryParams: { id: id_inmueble, fechaInicio: fecha_inicio, fechaFin: fecha_fin} });
    }else{
      this.router.navigateRoot(['/inmueble'], { queryParams: { id: id_inmueble }});
    }
  }
  
  toggleVisibilidad(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas por" + (this.inmuebleActual.habilitado ? " ocultar" : " mostrar") + " este inmueble para los huéspedes.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar visibilidad!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inmuebleService.toggleVisibilidad(this.inmuebleActual).subscribe((inmueble: Inmueble) => {
          this.inmuebleActual = inmueble;
        });
      }
    });
  }

  loadCoverPhoto() {
    const inmuebleId = this.inmuebleActual.id_inmueble;
    this.fotoInmuebleService.getAllPhotosByInmueble(inmuebleId).subscribe((fotos: FotoInmueble[]) => {
      if (fotos.length !== 0) {
        const encodedUrl = encodeURIComponent(fotos[0].urlFoto);
        this.coverPhoto = `http://localhost:3000/photos/${encodedUrl}`;
        console.log(this.coverPhoto);
        this.cdr.detectChanges(); // Forzamos la detección de cambios, no se si esto está tan bueno igual.
      }
    });
  }
  
  navigateToEditInmueble(){
    this.router.navigateRoot(['/ce-inmueble'], { queryParams: { idInmueble: this.inmuebleActual.id_inmueble }});
  }

  cancelarReserva(){
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Estas por cancelar la reserva de este inmueble.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#555',
      confirmButtonText: 'Cancelar reserva',
      cancelButtonText: "Salir",
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        let reserva: any = this.reservaActual;
        if (!reserva.huesped) {
          reserva.huesped = {}; // Asegúrate de que huesped esté definido
        }
        reserva.huesped.id_usuario = this.authService.getUserId();
        reserva.huesped.email = this.authService.getUser().email;
        this.reservaService.cancelarReserva(reserva).subscribe((inmueble: Inmueble) => {
          this.reservaCancelada.emit();
        });
      }
    });
  }



}
