import Inmueble from "./Inmueble"
import Persona from "./Persona"

export default class Reserva{
    fecha_inicio!: Date
    fecha_fin!: Date
    estado!: String
    observaciones!: String
    valoracion!: String
    fechaValoracion!: Date
    inmueble!: Inmueble
    huesped!: Persona
}