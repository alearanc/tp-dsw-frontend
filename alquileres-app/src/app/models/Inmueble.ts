import Localidad from "./Localidad";
import TipoInmueble from "./TipoInmueble";

export default class Inmueble {
    id_inmueble!: number;
    titulo_inmueble!: string;
    descripcion_inmueble!: string;
    precio_noche!: number;
    direccion_inmueble!: string;
    capacidad!: number;
    tipo_inmueble!: TipoInmueble;
    localidad!: Localidad;
    propietario!: number;
    habilitado!: Boolean;
    id_propietario!: number;
    puntuacion_promedio!: number;
    
    constructor(titulo_inmueble: string, descripcion_inmueble: string, precio_noche: number, direccion_inmueble: string, capacidad: number, tipoinmueble: TipoInmueble, localidad: Localidad, propietario: number) {
        this.titulo_inmueble = titulo_inmueble;
        this.descripcion_inmueble = descripcion_inmueble;
        this.precio_noche = precio_noche;
        this.direccion_inmueble = direccion_inmueble;
        this.capacidad = capacidad;
        this.tipo_inmueble = tipoinmueble;
        this.localidad = localidad;
        this.propietario = propietario;
        this.habilitado = true;
    }
}