import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import FotoInmueble from 'src/app/models/FotoInmueble';
import Inmueble from 'src/app/models/Inmueble';
import Reserva from 'src/app/models/Reserva';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { FotosInmuebleService } from 'src/app/services/fotos-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import Swal from 'sweetalert2';

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

  constructor(private cdr: ChangeDetectorRef, private router: CustomNavControllerService, private inmuebleService: InmuebleService, private reservaService: ReservasService, private fotoInmuebleService: FotosInmuebleService) { }

  ngOnChanges() {
    if(this.inmuebleActual.id_inmueble){
      this.loadCoverPhoto();
    }
  }

  calificarEstadia(){
    //lógica para calificar una estadía.
  }

  getCalificacionPromedio(){
    //deberíamos agarrar las reservas y hacer un AVG de las calificaciones.
    //o bien podríamos tener en nuestro inmueble un atributo "calificacionPromedio"
    //que se actualice cada vez que se haga una reserva.
    // return Math.random() * 5;
    return 3;
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
        this.cdr.detectChanges(); // Forzar la detección de cambios
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
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cancelar reserva!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.cancelarReserva(this.reservaActual).subscribe((inmueble: Inmueble) => {
          this.reservaCancelada.emit();
        });
      }
    });
  }



}
