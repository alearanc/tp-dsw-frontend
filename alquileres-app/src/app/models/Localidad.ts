export default class Localidad{
  cod_postal: number;
  nombre: string;

  constructor(cod_postal: number, nombre:string){
      this.cod_postal = cod_postal;
      this.nombre = nombre;
  }
}