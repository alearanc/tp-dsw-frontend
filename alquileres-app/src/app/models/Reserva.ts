import { Inmueble } from "./Inmueble"
import { Persona } from "./Persona"

export interface Reserva{
    fecha_inicio?: Date
    fecha_fin?: Date
    estado: string
    observaciones: string
    valoracion?: string
    fechaValoracion?: Date
    inmueble: Inmueble
    huesped: Persona
}