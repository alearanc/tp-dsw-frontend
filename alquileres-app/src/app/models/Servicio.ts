export default class Servicio {
  id_servicio!: number;
  descripcion_servicio: string;

  constructor(descripcion_servicio:string){
      this.descripcion_servicio = descripcion_servicio;
  }
}