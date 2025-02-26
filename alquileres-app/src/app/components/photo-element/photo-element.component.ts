import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FotoInmueble } from 'src/app/models/FotoInmueble';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photo-element',
  templateUrl: './photo-element.component.html',
  styleUrls: ['./photo-element.component.scss'],
})
export class PhotoElementComponent {
  @Input() imagen!: FotoInmueble;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.imagen.id_fotoInmueble);
  }

  verImagen(){
    Swal.fire({
      imageUrl: "http://localhost:3000/photos/" + this.imagen.urlFoto,
      showCloseButton: true,
      showConfirmButton: false,
      heightAuto: false,
    });
  }

}
