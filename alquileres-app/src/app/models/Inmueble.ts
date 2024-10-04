export default class Inmueble {
  constructor(
    public titulo_inmueble: string,
    public descripcion_inmueble: string,
    public precio_noche: number,
    public direccion_inmueble: string,
    public capacidad: number,
    public tipoinmueble: { id_tipoinmueble: number, descripcion?: string },
    public localidad: { cod_postal: number, nombre?: string },
    public propietario: number,
    public id_inmueble?: number,
  ) {}
}
