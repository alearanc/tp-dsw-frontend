import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addDays, parseISO } from 'date-fns';
import * as dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import Inmueble from 'src/app/models/Inmueble';
import { Reserva } from 'src/app/models/Reserva';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import Swal from 'sweetalert2';

dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);

@Component({
  selector: 'app-manage-inmuebles',
  templateUrl: './manage-inmuebles.page.html',
  styleUrls: ['./manage-inmuebles.page.scss'],
})
export class ManageInmueblesPage implements OnInit{

  searchQuery: string = '';
  filteredInmuebles: Inmueble[] = [];
  inmuebles: Inmueble[] = [];
  reservas: Reserva[] = [];
  reservasFiltradas: Reserva[] = [];
  disabledDates: Date[] = [];
  inmuebleSeleccionado!: Inmueble;
  fechaSeleccionada: boolean = false;
  rangoSelected!: any;

  selected: { startDate: dayjs.Dayjs, endDate: dayjs.Dayjs } = { startDate: dayjs(), endDate: dayjs() };
  maxDate: dayjs.Dayjs = dayjs().add(2, 'years').endOf('day');

  constructor(private inmuebleService: InmuebleService, private reservasService: ReservasService, private router: Router) {}


  ngOnInit(): void {
    this.inmuebleService.getMisInmuebles().subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
    });
  }

  navigateAddInmuebles() {
    this.router.navigate(['ce-inmueble']);
  }
 
  filterItems($event: any) {
    const query = this.searchQuery.toLowerCase();
    this.filteredInmuebles = this.inmuebles.filter((item: Inmueble) =>
      item.titulo_inmueble.toLowerCase().includes(query)
    );
  }

  selectItem(inmueble: Inmueble) {
    this.searchQuery = inmueble.titulo_inmueble;
    this.inmuebleSeleccionado = inmueble;
    this.filteredInmuebles = [];
    this.reservasService.getReservasByInmueble(inmueble.id_inmueble).subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
      this.reservasFiltradas = this.reservas;
    });
    this.limpiarFechas();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.filteredInmuebles = [];
    }
  }

  cancelarReserva(reserva: Reserva) {
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
        this.reservasService.cancelarReserva(reserva).subscribe(() => {
          this.reservasService.getReservasByInmueble(this.inmuebleSeleccionado.id_inmueble).subscribe((reservas: Reserva[]) => {
            this.reservas = reservas;
            this.reservasFiltradas = this.reservas;
          });
        })
      }});
  }

  isInvalidDate = (m: dayjs.Dayjs) => {
    return this.disabledDates.some(d => dayjs(d).isSame(m, 'day'));
  }

  onDateRangeSelected(event: any) {
    const { startDate, endDate } = event;
    this.rangoSelected = event;
  
    if (this.isRangeInvalid(startDate, endDate)) {
      alert('El rango seleccionado contiene fechas no disponibles.');
      this.selected = { startDate: dayjs(), endDate: dayjs() };
    } else {
      this.selected = { startDate, endDate };
  
      this.reservasFiltradas = this.reservas.filter(reserva => {
        const reservaInicio = dayjs(reserva.fecha_inicio);
        const reservaFin = dayjs(reserva.fecha_fin);
        return (
          (reservaInicio.isAfter(startDate) && reservaInicio.isBefore(endDate)) ||
          (reservaFin.isSame(startDate) || reservaFin.isAfter(startDate)) && (reservaFin.isSame(endDate) || reservaFin.isBefore(endDate)) ||
          (reservaInicio.isBefore(startDate) && reservaFin.isAfter(endDate))
        );
      });
      this.fechaSeleccionada = true;
    }
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

  limpiarFechas() {
    this.selected = { startDate: dayjs(), endDate: dayjs() };
    this.reservasFiltradas = this.reservas;
    this.fechaSeleccionada = false;
  }

}
