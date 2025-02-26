import { Servicio } from "./Servicio";

export interface InmuebleServicio {
  id_inmueble: number;
  id_servicio: number;
  servicio?: Servicio;
  descripcion_servicio?: string
}
