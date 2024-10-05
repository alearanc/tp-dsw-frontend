import Localidad from "./Localidad"
import TipoInmueble from "./TipoInmueble"

export default class Inmueble {
    id_inmueble!: number;
    titulo_inmueble!: string;
    descripcion_inmueble!: string;
    precio_noche!: number;
    direccion_inmueble!: string;
    capacidad!: number;
    tipoinmueble!: TipoInmueble;
    localidad!: Localidad;
    propietario!: number;
    
    constructor(titulo_inmueble: string, descripcion_inmueble: string, precio_noche: number, direccion_inmueble: string, capacidad: number, tipoinmueble: TipoInmueble, localidad: Localidad, propietario: number) {
        this.titulo_inmueble = titulo_inmueble;
        this.descripcion_inmueble = descripcion_inmueble;
        this.precio_noche = precio_noche;
        this.direccion_inmueble = direccion_inmueble;
        this.capacidad = capacidad;
        this.tipoinmueble = tipoinmueble;
        this.localidad = localidad;
        this.propietario = propietario;
    }
}