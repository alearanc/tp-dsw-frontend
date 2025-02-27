// inmueble-form.component.ts
import { Component, effect, EventEmitter, input, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Inmueble } from 'src/app/models/Inmueble';
import { Localidad } from 'src/app/models/Localidad';
import { TipoInmueble } from 'src/app/models/TipoInmueble';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-inmueble-form',
  templateUrl: './inmueble-form.component.html',
  styleUrls: ['./inmueble-form.component.scss'],
})
export class InmuebleFormComponent {
  // Cambio @Input() por Signal
  inmuebleSeleccionado = input<Inmueble | undefined>();

  // Mantengo los otros @Input como están por ahora
  @Input() tipoInmuebles: TipoInmueble[] = [];
  @Input() localidades: Localidad[] = [];
  @Output() onSave = new EventEmitter<Inmueble>();

  inmuebleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) {
    // Inicializo el formulario como antes
    this.inmuebleForm = this.fb.group({
      tipo_inmueble: [null, Validators.required],
      titulo_inmueble: ['', Validators.required],
      descripcion_inmueble: ['', Validators.required],
      precio_noche: ['', Validators.required],
      localidad: [null, Validators.required],
      direccion_inmueble: ['', Validators.required],
      capacidad: ['', Validators.required],
    });

    // Uso effect para reaccionar a cambios en inmuebleSeleccionado
    effect(() => {
      const inmueble = this.inmuebleSeleccionado();
      if (inmueble) {
        // Actualizo el formulario con los valores del inmueble seleccionado
        this.inmuebleForm.patchValue({
          tipo_inmueble: inmueble.tipo_inmueble?.id_tipoinmueble,
          titulo_inmueble: inmueble.titulo_inmueble,
          descripcion_inmueble: inmueble.descripcion_inmueble,
          precio_noche: inmueble.precio_noche,
          localidad: inmueble.localidad?.cod_postal,
          direccion_inmueble: inmueble.direccion_inmueble,
          capacidad: inmueble.capacidad,
        });
      } else {
        // Si no hay inmueble, reseteo el formulario
        this.inmuebleForm.reset();
      }
    });
  }

  // Formateo el contador de caracteres
  ccf(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} caracteres restantes`;
  }

  saveInmueble() {
    const nuevoInmueble: Inmueble = this.inmuebleForm.value;
    nuevoInmueble.propietario = this.authService.getUserId();

    // Busco la localidad y el tipo de inmueble, asegurándome de que existan
    nuevoInmueble.localidad = this.localidades.find(
      (loc) => loc.cod_postal === this.inmuebleForm.controls['localidad'].value
    )!; // Uso ! porque las validaciones garantizan que siempre hay un valor
    nuevoInmueble.tipo_inmueble = this.tipoInmuebles.find(
      (tipo) => tipo.id_tipoinmueble === this.inmuebleForm.controls['tipo_inmueble'].value
    )!; // Ídem aquí

    const inmuebleActual = this.inmuebleSeleccionado();
    if (inmuebleActual) {
      // Actualizo el inmueble existente
      this.inmuebleService.updateInmueble(inmuebleActual.id_inmueble, nuevoInmueble).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (error) => this.presentAlert('Error al actualizar el inmueble: ' + error.message),
      });
    } else {
      // Creo un nuevo inmueble
      this.inmuebleService.addInmueble(nuevoInmueble).subscribe({
        next: (inmueble: Inmueble) => {
          this.onSave.emit(inmueble);
          this.inmuebleForm.markAsPristine();
        },
        error: (error) => this.presentAlert('Error al crear el inmueble: ' + error.message),
      });
    }
  }

  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }
}