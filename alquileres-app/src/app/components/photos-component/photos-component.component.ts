import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FotoInmueble } from 'src/app/models/FotoInmueble';
import { FotosInmuebleService } from 'src/app/services/fotos-inmueble/fotos-inmueble.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photos-component',
  templateUrl: './photos-component.component.html',
  styleUrls: ['./photos-component.component.scss'],
})
export class PhotosComponentComponent  implements OnInit {
  @ViewChild('file') fileInput: any;
  selectedImages: { file: File; url: string }[] = [];
  uploadingImages: { file: File; url: string }[] = [];
  @Input() inmuebleId!: number;
  showUploadButton = false;
  existingPhotos: FotoInmueble[] = [];

  constructor(
    private fotosInmuebleService: FotosInmuebleService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.loadExistingPhotos(this.inmuebleId);
  }

  setImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const newImages = Array.from(input.files).map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      this.uploadingImages = [...this.uploadingImages, ...newImages];
      this.uploadImage(newImages);
    }
  }

  uploadImage(images: { file: File; url: string }[]) {
    if (this.inmuebleId && images.length > 0) {
      const files = images.map(image => image.file);
      this.fotosInmuebleService.uploadPhotos(this.inmuebleId, files).subscribe({
        next: (response: FotoInmueble[]) => {
          this.fotosInmuebleService.updateFotosSubidas(response);
          this.existingPhotos = response;
          this.uploadingImages = this.uploadingImages.filter(img => !images.includes(img));
            this.toastController.create({
              message: 'Cambios guardados con éxito',
              duration: 2000,
              position: 'bottom'
            }).then(toast => toast.present());
        },
        error: (err) => {
          console.error('Error al subir las fotos:', err);
          this.uploadingImages = this.uploadingImages.filter(img => !images.includes(img));
        }
      });
    } else {
      console.error('Debe seleccionar un inmueble y al menos una foto.');
    }
  }

  loadExistingPhotos(inmuebleId: number) {
    this.inmuebleId = inmuebleId;
    this.fotosInmuebleService.getAllPhotosByInmueble(this.inmuebleId).subscribe((photos: FotoInmueble[]) => {
      this.fotosInmuebleService.updateFotosSubidas(photos);
      this.existingPhotos = photos;
    });
  }

  deletePhoto(photoId: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#000',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
      this.fotosInmuebleService.deletePhotoById(photoId).subscribe({
        next: () => {
          this.existingPhotos = this.existingPhotos.filter(photo => photo.id_fotoInmueble !== photoId);
          this.fotosInmuebleService.updateFotosSubidas(this.existingPhotos.length > 0 ? this.existingPhotos : null);
            this.toastController.create({
              message: 'Cambios guardados con éxito',
              duration: 2000,
              position: 'bottom'
            }).then(toast => toast.present());
        },
        error: (err) => {
          console.error('Error al eliminar la foto:', err);
        }
      });
      }
  })};

}
