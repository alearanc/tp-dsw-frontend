import { TipoUsuario } from "./TipoUsuario.enum";

export interface Persona {
    id_usuario: number
    nombre: string
    apellido: string
    email: string
    password: string
    tipo_usuario: TipoUsuario
    telefono: string
    domicilio: string
}