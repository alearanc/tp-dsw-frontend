export default class TipoInmueble {
    id_tipoinmueble!: number;
    descripcion: string;

    constructor(descripcion:string){
        this.descripcion = descripcion;
    }
}