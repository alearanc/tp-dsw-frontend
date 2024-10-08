import Inmueble from "./Inmueble"
import Persona from "./Persona"

export default class Reserva{
    fecha_inicio!: Date
    fecha_fin!: Date
    estado!: String
    observaciones!: String
    valoracion?: String
    fechaValoracion?: Date
    inmueble!: Inmueble
    huesped!: Persona
    
    constructor( fecha_inicio: Date, fecha_fin: Date, estado: String, observaciones: String, inmueble: Inmueble, huesped: Persona, valoracion?: String, fechaValoracion?: Date){
    this.fecha_inicio = fecha_inicio
        this.fecha_fin = fecha_fin
        this.estado = estado
        this.observaciones = observaciones
        this.inmueble = inmueble
        this.huesped = huesped
        this.valoracion = valoracion
        this.fechaValoracion = fechaValoracion
    }
}