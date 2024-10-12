import Servicio from "./Servicio";

export default class InmuebleServicio {
  id_inmueble: number;
  id_servicio: number;
  servicio?: Servicio;  // Añadir la propiedad servicio como opcional
  descripcion_servicio?: string
  constructor(idInmueble: number, idServicio: number, servicio: Servicio){
    this.id_inmueble = idInmueble;
    this.id_servicio = idServicio;
    this.servicio = servicio;
  }
}
