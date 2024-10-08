import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addDays, parseISO } from 'date-fns';
import * as dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';

dayjs.extend(isoWeek);

import Inmueble from 'src/app/models/Inmueble';
import Reserva from 'src/app/models/Reserva';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';

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

  constructor(private inmuebleService: InmuebleService, private route: ActivatedRoute, private reservasService: ReservasService) { }

  ngOnInit() {
    const idInmuebleActual = this.route.snapshot.queryParams['id'];
    this.inmuebleService.getInmueble(idInmuebleActual).subscribe((inmueble) => {
      this.inmuebleSelected = inmueble;
    });
  }

  getFechasDisponibles(){
    this.showCalendar = true;
    this.reservasService.getReservasByInmueble(this.inmuebleSelected.id_inmueble).subscribe((reservas: Reserva[]) => {
      this.disabledDates = reservas.reduce((acc: Date[], reserva: Reserva) => {
        return acc.concat(this.getDatesBetween(reserva.fecha_inicio.toString(), reserva.fecha_fin.toString()));
      }, []);
      console.log(this.disabledDates);
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
    while (currentDate <= endDate) {
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
      this.selected = { startDate: dayjs(), endDate: dayjs() }; // Reset to default
    } else {
      this.selected = { startDate, endDate };
    }
  }

  calculateTotal(): number {
    const days = this.selected.endDate.diff(this.selected.startDate, 'day') + 1; // +1 to include the start date
    return days * this.inmuebleSelected.precio_noche;
  }
}