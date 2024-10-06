import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Inmueble from 'src/app/models/Inmueble';
import Localidad from 'src/app/models/Localidad';
import TipoInmueble from 'src/app/models/TipoInmueble';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { LocalidadService } from 'src/app/services/localidad/localidad.service';
import { TipoInmubeleService } from 'src/app/services/tipo-inmueble/tipo-inmubele.service';

@Component({
  selector: 'app-ce-inmueble',
  templateUrl: './ce-inmueble.page.html',
  styleUrls: ['./ce-inmueble.page.scss'],
})
export class CEInmueblePage implements OnInit {

  inmuebleSeleccionado!: Inmueble;
  tipoInmuebles: TipoInmueble[] = [];
  localidades: Localidad[] = [];
  inmuebleForm!: FormGroup;

  constructor(private fb: FormBuilder, private tipoInmuebleService: TipoInmubeleService, private localidadService: LocalidadService, private inmuebleService: InmuebleService,
    private authService: AuthService, private route: ActivatedRoute, private router: CustomNavControllerService
  ) { }

  ngOnInit() {
    this.inmuebleForm = this.fb.group({
      tipo_inmueble: [null, [Validators.required]],
      titulo_inmueble: ['', Validators.required],
      descripcion_inmueble: ['', Validators.required],
      precio_noche: ['', [Validators.required]],
      localidad: [null, Validators.required],
      direccion_inmueble: ['', Validators.required],
      capacidad: ['', Validators.required]
    });
    const idInmuebleActual = this.route.snapshot.queryParams['idInmueble'];
    if (idInmuebleActual) {
      this.inmuebleService.getInmueble(idInmuebleActual).subscribe((inmueble: Inmueble) => {
        this.inmuebleSeleccionado = inmueble;
        this.inmuebleForm.patchValue(inmueble);
      });
    }
    this.tipoInmuebleService.getAllTipoInmueble().subscribe((tiposInmuebles: TipoInmueble[]) => {
      this.tipoInmuebles = tiposInmuebles;
    });
    this.localidadService.getAllLocalidad().subscribe((localidades: Localidad[]) => {
      this.localidades = localidades
    });
  }

  saveInmueble() {
    let nuevoInmueble: Inmueble = this.inmuebleForm.value;
    nuevoInmueble.propietario = this.authService.getUserId();
    nuevoInmueble.localidad = this.localidades.filter((localidad: Localidad) => localidad.cod_postal !== this.inmuebleForm.controls['localidad'].value)[0];
    console.log(this.inmuebleForm.value)
    nuevoInmueble.tipo_inmueble = this.tipoInmuebles.filter((tipo: TipoInmueble) => tipo.id_tipoinmueble !== this.inmuebleForm.controls['tipo_inmueble'].value)[0];
    if (this.inmuebleSeleccionado) {
      this.inmuebleService.updateInmueble(this.inmuebleSeleccionado.id_inmueble, nuevoInmueble).subscribe(() => { 
        this.router.navigateForward(['/dashboard']);
      });
    } else {
      this.inmuebleService.addInmueble(nuevoInmueble).subscribe(() => { 
        this.router.navigateForward(['/dashboard']);
      });
    }
  }

}
