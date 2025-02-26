// inmueble-form.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import Inmueble from 'src/app/models/Inmueble';
import Localidad from 'src/app/models/Localidad';
import TipoInmueble from 'src/app/models/TipoInmueble';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-inmueble-form',
  templateUrl: './inmueble-form.component.html',
  styleUrls: ['./inmueble-form.component.scss'],
})
export class InmuebleFormComponent {
  @Input() inmuebleSeleccionado?: Inmueble;
  @Input() tipoInmuebles: TipoInmueble[] = [];
  @Input() localidades: Localidad[] = [];
  @Output() onSave = new EventEmitter<Inmueble>();

  inmuebleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private inmuebleService: InmuebleService,
    private authService: AuthService,
    private router: CustomNavControllerService,
    private alertController: AlertController
  ) {
    this.inmuebleForm = this.fb.group({
      tipo_inmueble: [null, Validators.required],
      titulo_inmueble: ['', Validators.required],
      descripcion_inmueble: ['', Validators.required],
      precio_noche: ['', Validators.required],
      localidad: [null, Validators.required],
      direccion_inmueble: ['', Validators.required],
      capacidad: ['', Validators.required],
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

    if (this.inmuebleSeleccionado) {
      this.inmuebleService.updateInmueble(this.inmuebleSeleccionado.id_inmueble, nuevoInmueble)
        .subscribe({
          next: () => this.router.navigateForward(['/dashboard']),
          error: (error) => this.presentAlert('Error al actualizar el inmueble: ' + error.message),
        });
    } else {
      this.inmuebleService.addInmueble(nuevoInmueble)
        .subscribe({
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