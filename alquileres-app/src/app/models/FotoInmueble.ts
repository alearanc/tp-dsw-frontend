export default class FotoInmueble {
    id_fotoInmueble!: number;
    urlFoto: string;
    inmuebleId: number;

    constructor(urlFoto: string, inmuebleId: number){
        this.urlFoto = urlFoto;
        this.inmuebleId = inmuebleId;
    }
}