export default class Inmueble {
  idInmueble: string;
  tituloInmueble: string;
  descripcionInmueble: string;
  precioNoche: number;
  direccionInmueble: string;
  capacidad: number;
  idTipoInmueble: number;
  codPostal: number;
  idPropietario: number;

  constructor(data: any) {
    this.idInmueble = data.idInmueble;
    this.tituloInmueble = data.tituloInmueble;
    this.descripcionInmueble = data.descripcionInmueble;
    this.precioNoche = data.precioNoche;
    this.direccionInmueble = data.direccionInmueble;
    this.capacidad = data.capacidad;
    this.idTipoInmueble = data.idTipoInmueble;
    this.codPostal = data.codPostal;
    this.idPropietario = data.idPropietario;
  }
}