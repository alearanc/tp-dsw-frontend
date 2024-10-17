import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import InmuebleServicio from 'src/app/models/inmuebleServicio';
import Servicio from 'src/app/models/Servicio';
import { InmuebleServicioService } from 'src/app/services/inmueble-servicio/inmueble-servicio.service';
import { ServicioService } from 'src/app/services/servicio/servicio.service';

@Component({
  selector: 'app-inmueble-servicio',
  templateUrl: './inmueble-servicio.component.html',
  styleUrls: ['./inmueble-servicio.component.scss']
})
export class InmuebleServicioComponent implements OnInit {

  @Input() id_inmueble!: number;
  @Output() serviciosInmueble: InmuebleServicio[] = [];
  id_servicio!: number;
  allServicios: Servicio[] = [];  // Lista de todos los servicios disponibles
  mensajeError: string | null = null;
  servicio = new FormControl();

  constructor(private inmuebleServicioService: InmuebleServicioService, private servicioService: ServicioService) {}

  ngOnInit(): void {
    this.getServicios();  // Cargar los servicios del inmueble
    this.loadAllServicios();  // Cargar todos los servicios disponibles
  }

  loadAllServicios(): void {
    this.servicioService.getAllServicio()
      .subscribe({
        next: (data) => {
          this.allServicios = data;
        },
        error: (err) => {
          console.error('Error al cargar los servicios', err);
          this.mensajeError = 'Error al cargar los servicios';
        }
      });
  }

  getServicios(): void {
    this.inmuebleServicioService.getServiciosByInmuebleId(this.id_inmueble)
      .subscribe({
        next: (data) => {
          this.serviciosInmueble = data.map(item => ({
            id_inmueble: item.id_inmueble,
            id_servicio: item.id_servicio,
            descripcion_servicio: item.servicio ? item.servicio.descripcion_servicio : 'Servicio no disponible'
          }));
          //console.log('Servicios procesados:', this.serviciosInmueble);

        },
        error: (err) => {
          console.error('Error al obtener los servicios', err);
          this.mensajeError = 'Error al obtener los servicios';
        }
      });
  }

  addInmuebleServicio(): void {
    const newInmuebleServicio: InmuebleServicio = { id_inmueble: this.id_inmueble, id_servicio: this.servicio.value }; 
    if (newInmuebleServicio.id_servicio > 0) {
      this.mensajeError= '';
      this.inmuebleServicioService.addInmuebleServicio([newInmuebleServicio])
        .subscribe({
          next: () => {
            this.getServicios();  // Actualizar la lista de servicios
          },
          error: (err) => {
            console.error('Error al agregar el servicio al inmueble', err);
            this.mensajeError = 'Error al agregar el servicio al inmueble';
          }
        });
    } else {
      this.mensajeError = 'Selecciona un servicio válido';
    }
  }

  deleteInmuebleServicio(id_servicio: number): void {
    this.mensajeError= ''
    this.inmuebleServicioService.deleteInmuebleServicio(this.id_inmueble, id_servicio)
      .subscribe({
        next: () => {
          this.getServicios();  // Actualizar la lista de servicios después de eliminar
        },
        error: (err) => {
          console.error('Error al eliminar el servicio del inmueble', err);
          this.mensajeError = 'Error al eliminar el servicio del inmueble';
        }
      });
  }

  isServicioSelected(id_servicio: number): boolean {
    return this.serviciosInmueble.some(servicio => servicio.id_servicio === id_servicio);
  }

}
