// ce-inmueble.page.ts
import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inmueble } from 'src/app/models/Inmueble';
import { Localidad } from 'src/app/models/Localidad';
import { TipoInmueble } from 'src/app/models/TipoInmueble';
import { FotosInmuebleService } from 'src/app/services/fotos-inmueble/fotos-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';
import { TipoInmubeleService } from 'src/app/services/tipo-inmueble/tipo-inmubele.service';

@Component({
  selector: 'app-ce-inmueble',
  templateUrl: './ce-inmueble.page.html',
  styleUrls: ['./ce-inmueble.page.scss'],
})
export class CEInmueblePage implements OnInit, OnDestroy {
  inmuebleSeleccionado = signal<Inmueble | null>(null);
  tipoInmuebles: TipoInmueble[] = [];
  localidades: Localidad[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private tipoInmuebleService: TipoInmubeleService,
    private localidadService: LocalidadService,
    private inmuebleService: InmuebleService,
    private route: ActivatedRoute,
    private router: Router,
    private fotoInmuebleService: FotosInmuebleService
  ) {}

  ngOnInit() {
    const idInmuebleActual = this.route.snapshot.queryParams['idInmueble'];
    if (idInmuebleActual) {
      this.inmuebleService.getInmueble(idInmuebleActual).subscribe((inmueble: Inmueble) => {
        this.inmuebleSeleccionado.set(inmueble);
      });
    }
    this.tipoInmuebleService.getAllTipoInmueble().subscribe((tipos) => {
      this.tipoInmuebles = tipos;
    });
    this.localidadService.getAllLocalidad().subscribe((localidades) => {
      this.localidades = localidades;
    });
  }

  ngOnDestroy() {
    this.fotoInmuebleService.updateFotosSubidas(null);
  }

  onInmuebleSaved(inmueble: Inmueble) {
    this.inmuebleSeleccionado.set(inmueble);
    this.router.navigate(['/ce-inmueble'], { queryParams: { idInmueble: inmueble.id_inmueble } });
  }
}