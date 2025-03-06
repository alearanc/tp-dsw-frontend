import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addDays, parseISO } from 'date-fns';
import * as dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { FotoInmueble } from 'src/app/models/FotoInmueble';
import { Inmueble } from 'src/app/models/Inmueble';
import { InmuebleServicio } from 'src/app/models/inmuebleServicio';
import { Reserva } from 'src/app/models/Reserva';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FotosInmuebleService } from 'src/app/services/fotos-inmueble/fotos-inmueble.service';
import { InmuebleServicioService } from 'src/app/services/inmueble-servicio/inmueble-servicio.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import Swal from 'sweetalert2';

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  selector: 'app-inmueble-details',
  templateUrl: './inmueble-details.page.html',
  styleUrls: ['./inmueble-details.page.scss'],
})
export class InmuebleDetailsPage implements OnInit {

  inmuebleSelected!: Inmueble;
  showCalendar: boolean = false;
  disabledDates: Date[] = [];
  selected: { startDate: dayjs.Dayjs, endDate: dayjs.Dayjs } = { startDate: dayjs(), endDate: dayjs() };
  minDate: dayjs.Dayjs = dayjs().startOf('day');
  maxDate: dayjs.Dayjs = dayjs().add(2, 'years').endOf('day');
  disableButton: boolean = false;
  disableReservarButton: boolean = true;
  loading: boolean = true;
  idUsuario: number = this.authService.getUserId();
  fechaInicio?: dayjs.Dayjs;
  fechaFin?: dayjs.Dayjs;
  serviciosInmueble: InmuebleServicio[] = [];
  coverPhotos: string[] = ["./assets/no-cover.jpg"];
  isFullscreen: boolean = false;
  fullscreenPhoto: string = '';

  constructor(
    private inmuebleServicioService: InmuebleServicioService,
    private cdr: ChangeDetectorRef,
    private inmuebleService: InmuebleService,
    private route: ActivatedRoute,
    private reservasService: ReservasService,
    private authService: AuthService,
    private fotoInmuebleService: FotosInmuebleService,
    private router: Router
  ) { }

  ngOnInit() {
    const idInmuebleActual = this.route.snapshot.queryParams['id'];
    if (!idInmuebleActual) this.router.navigate(['/']);
    const fechaInicio = this.route.snapshot.queryParams['fechaInicio']
    const fechaFin = this.route.snapshot.queryParams['fechaFin']
    this.fechaInicio = fechaInicio ? dayjs(fechaInicio).tz('UTC') : undefined;
    this.fechaFin = fechaFin ? dayjs(fechaFin).tz('UTC') : undefined;
    this.inmuebleService.getInmueble(idInmuebleActual).subscribe((inmueble) => {
      this.inmuebleSelected = inmueble;
    });
    this.inmuebleServicioService.getServiciosByInmuebleId(idInmuebleActual).subscribe((servicios: InmuebleServicio[]) => {
      this.serviciosInmueble = servicios;
    });
    if (this.idUsuario) {
      this.reservasService.checkReservaFutura(idInmuebleActual).subscribe((res: any) => {
        this.loading = false;
        if (res.hasReservation == true) { this.disableButton = true }
      })
    } else {
      this.loading = false
    }
    this.loadCoverPhoto();
  }

  abrirFotoFS(photo: string): void {
    this.fullscreenPhoto = photo;
    this.isFullscreen = true;
  }

  closeFullscreen(): void {
    this.isFullscreen = false;
    this.fullscreenPhoto = '';
  }

  loadCoverPhoto() {
    const inmuebleId = this.route.snapshot.queryParams['id'];
    this.fotoInmuebleService.getAllPhotosByInmueble(inmuebleId).subscribe((fotos: FotoInmueble[]) => {
      if (fotos.length !== 0) {
        this.coverPhotos = fotos.map((foto) => {
          const encodedUrl = encodeURIComponent(foto.urlFoto);
          return encodedUrl;
        });
        this.cdr.detectChanges(); // Forzar detección de cambios si es necesario
      }
    });
  }

  getFechasDisponibles() {
    if (this.idUsuario) {
      this.showCalendar = true;
      this.reservasService.getReservasByInmueble(this.inmuebleSelected.id_inmueble).subscribe((reservas: Reserva[]) => {
        this.disabledDates = reservas.reduce((acc: Date[], reserva: Reserva) => {
          return acc.concat(this.getDatesBetween(reserva.fecha_inicio!.toString(), reserva.fecha_fin!.toString()));
        }, []);
        this.disabledDates.push(new Date()) // Rn que no deja reservar de hoy para hoy
      });
    } else {
      Swal.fire({
        title: 'Inicia sesión para reservar',
        confirmButtonColor: '#000',
        heightAuto: false,
        text: 'Debes iniciar sesión para poder reservar un inmueble.',
        icon: 'info',
        confirmButtonText: 'Iniciar sesión'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']); // Redirige al login
        }
      });
    }
  }

  getDatesBetween(startDate: string, endDate: string): Date[] {
    const dates = [];
    let currentDate = parseISO(startDate);
    const lastDate = parseISO(endDate);

    while (currentDate <= lastDate) {
      dates.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return dates;
  }

  isInvalidDate = (m: dayjs.Dayjs) => {
    return this.disabledDates.some(d => dayjs(d).isSame(m, 'day'));
  }

  isRangeInvalid(startDate: dayjs.Dayjs, endDate: dayjs.Dayjs): boolean {
    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
      if (this.isInvalidDate(currentDate)) {
        return true;
      }
      currentDate = currentDate.add(1, 'day');
    }
    return false;
  }

  onDateRangeSelected(event: any) {
    const { startDate, endDate } = event;

    if (this.isRangeInvalid(startDate, endDate)) {
      alert('El rango seleccionado contiene fechas no disponibles.');
      this.selected = { startDate: dayjs(), endDate: dayjs() };
    } else {
      this.selected = { startDate, endDate };

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const startDateObj = new Date(startDate.$d);
      const endDateObj = new Date(endDate.$d);
      startDateObj.setHours(0, 0, 0, 0);
      endDateObj.setHours(0, 0, 0, 0);

      this.disableReservarButton = (startDateObj.getTime() === today.getTime() || endDateObj.getTime() === today.getTime());
    }
  }

  calculateTotal(): number {
    const days = this.selected.endDate.diff(this.selected.startDate, 'day') + 1;
    return days * this.inmuebleSelected.precio_noche;
  }

  reservar() {
    this.loading = true;
    const reserva: Reserva = {
      fecha_inicio: this.selected.startDate.toDate(),
      fecha_fin: this.selected.endDate.toDate(),
      estado: 'Reservado',
      observaciones: '',
      inmueble: this.inmuebleSelected,
      huesped: JSON.parse(localStorage.getItem('user')!),
    };
    this.reservasService.reservar(reserva).subscribe(
      (res: any) => {
        this.disableButton = true;
        Swal.fire({
          title: 'Reserva realizada',
          heightAuto: false,
          confirmButtonColor: '#000',
          text: 'Se ha reservado para el día desde ' + this.selected.startDate.format('DD/MM/YYYY') + ' hasta ' + this.selected.endDate.format('DD/MM/YYYY') + ' por un total de $' + this.calculateTotal() + ' en ' + this.inmuebleSelected.direccion_inmueble,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/']); // Redirige al home
          }
        });
      },
      error => {
        alert(`Error al realizar la reserva: ${error}`);
      }
    );
  }
}