import { Localidad } from "./Localidad";
import { TipoInmueble } from "./TipoInmueble";

export interface Inmueble {
    id_inmueble: number;
    titulo_inmueble: string;
    descripcion_inmueble: string;
    precio_noche: number;
    direccion_inmueble: string;
    capacidad: number;
    tipo_inmueble: TipoInmueble;
    localidad: Localidad;
    propietario: number;
    habilitado: Boolean;
    id_propietario: number;
    puntuacion_promedio: number;
}