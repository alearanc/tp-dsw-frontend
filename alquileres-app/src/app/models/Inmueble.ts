export default class Inmueble {
  id_inmueble!: number; 
  titulo_inmueble: string;
  descripcion_inmueble: string;
  precio_noche: number;
  direccion_inmueble: string;
  capacidad: number;
  tipoinmueble: {
    id_tipoinmueble: number;
  };
  localidad: {
    cod_postal: number;
    nombre: string;
  };
  propietario: number;

  constructor(
    titulo_inmueble: string,
    descripcion_inmueble: string,
    precio_noche: number,
    direccion_inmueble: string,
    capacidad: number,
    id_tipoinmueble: number,
    cod_postal: number,
    propietario: number
  ) {
    this.titulo_inmueble = titulo_inmueble;
    this.descripcion_inmueble = descripcion_inmueble;
    this.precio_noche = precio_noche;
    this.direccion_inmueble = direccion_inmueble;
    this.capacidad = capacidad;
    this.tipoinmueble = { id_tipoinmueble };
    this.localidad = { cod_postal, nombre: '' };
    this.propietario = propietario;
  }
}
