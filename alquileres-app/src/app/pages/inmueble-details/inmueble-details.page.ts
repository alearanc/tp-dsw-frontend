import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addDays, parseISO } from 'date-fns';
import * as dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';

dayjs.extend(isoWeek);
dayjs.extend(utc);

import Inmueble from 'src/app/models/Inmueble';
import Reserva from 'src/app/models/Reserva';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import Swal from 'sweetalert2';

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

  constructor(private inmuebleService: InmuebleService, private route: ActivatedRoute, private reservasService: ReservasService, private router: CustomNavControllerService) { }

  ngOnInit() {
    const idInmuebleActual = this.route.snapshot.queryParams['id'];
    this.inmuebleService.getInmueble(idInmuebleActual).subscribe((inmueble) => {
      this.inmuebleSelected = inmueble;
    });
    this.reservasService.checkReservaFutura(idInmuebleActual).subscribe((res: any) => {
      this.loading = false;
      if (res.hasReservation == true) { this.disableButton = true }
    })
  }

  getFechasDisponibles() {
    this.showCalendar = true;
    this.reservasService.getReservasByInmueble(this.inmuebleSelected.id_inmueble).subscribe((reservas: Reserva[]) => {
      this.disabledDates = reservas.reduce((acc: Date[], reserva: Reserva) => {
        return acc.concat(this.getDatesBetween(reserva.fecha_inicio.toString(), reserva.fecha_fin.toString()));
      }, []);
      this.disabledDates.push(new Date()) // Rn que no deja reservar de hoy para hoy
    });
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
    console.log(startDate.$d, endDate.$d);
    
    if (this.isRangeInvalid(startDate, endDate)) {
      alert('El rango seleccionado contiene fechas no disponibles.');
      this.selected = { startDate: dayjs(), endDate: dayjs() }; // Reset to default
    } else {
      this.selected = { startDate, endDate };
    
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    
      const startDateObj = new Date(startDate.$d);
      const endDateObj = new Date(endDate.$d);
      startDateObj.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
      endDateObj.setHours(0, 0, 0, 0); // Reset time to midnight for accurate comparison
    
      this.disableReservarButton = (startDateObj.getTime() === today.getTime() || endDateObj.getTime() === today.getTime());
    
      console.log(startDateObj.toLocaleDateString());
      console.log(today.toLocaleDateString());
      console.log(endDateObj.toLocaleDateString());
      console.log(this.disableReservarButton);
    }
  }

  calculateTotal(): number {
    const days = this.selected.endDate.diff(this.selected.startDate, 'day') + 1; // +1 to include the start date
    return days * this.inmuebleSelected.precio_noche;
  }

  reservar() {
    this.loading = true;
    const reserva = new Reserva(
      this.selected.startDate.toDate(),
      this.selected.endDate.toDate(),
      'Reservado',
      '',
      this.inmuebleSelected,
      JSON.parse(localStorage.getItem('user')!)
    );
    this.reservasService.reservar(reserva).subscribe(
      (res: any) => {
        this.disableButton = true;
        Swal.fire({
          title: 'Reserva realizada',
          text: 'Se ha reservado para el día desde ' + this.selected.startDate.format('DD/MM/YYYY') + ' hasta ' + this.selected.endDate.format('DD/MM/YYYY') + ' por un total de $' + this.calculateTotal() + ' en ' + this.inmuebleSelected.direccion_inmueble,
          icon: 'success',
          confirmButtonText: 'Continuar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigateRoot(['/']); // Redirige al home
          }
        });
      },
      error => {
        alert(`Error al realizar la reserva: ${error}`);
      }
    );
  }
}