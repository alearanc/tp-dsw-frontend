import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import FotoInmueble from 'src/app/models/FotoInmueble';
import Inmueble from 'src/app/models/Inmueble';
import { FotosInmuebleService } from 'src/app/services/fotos-inmueble.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-foto-inmueble',
  templateUrl: './foto-inmueble.page.html',
  styleUrls: ['./foto-inmueble.page.scss'],
})
export class FotoInmueblePage implements OnInit {

  inmuebles!: Inmueble[];
  @ViewChild('fileInput') fileInput: any; // Referencia al input de archivo
  selectedImages: { file: File; url: string }[] = [];
  showUploadButton = false;
  selectedInmuebleId!: number;
  existingPhotos!: FotoInmueble[]; //Las fotos q traigo del backend/ q ya tan subidas

  constructor(private inmuebleService: InmuebleService,
              private fotosInmuebleService: FotosInmuebleService,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    this.inmuebleService.getAllInmuebles().subscribe((inmuebles: Inmueble[])=>this.inmuebles = inmuebles)
  }

  onInmuebleChange(event: any) {
    this.selectedInmuebleId = event.detail.value;
    this.showUploadButton = true;
    this.loadExistingPhotos(); // Llama a la función para cargar las fotos existentes
  }


  setImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedImages = Array.from(input.files).map(file => ({
        file,
        url: URL.createObjectURL(file) // Genera una URL para previsualizar la imagen
      }));
      this.showUploadButton = true; // Mostrar el botón de subida de fotos
    }
  }

  upload() {
    if (this.selectedInmuebleId && this.selectedImages.length > 0) {
      const files = this.selectedImages.map(image => image.file);
      this.fotosInmuebleService.uploadPhotos(this.selectedInmuebleId, files).subscribe({
        next: (response) => {
          this.selectedImages = [];
          this.loadExistingPhotos();
        },
        error: (err) => {
          console.error('Error al subir las fotos:', err);
          this.selectedImages = [];
          this.loadExistingPhotos();
        }
      });
    } else {
      console.error('Debe seleccionar un inmueble y al menos una foto.');
    }
  }

  removeImage(image: { file: File; url: string }) {
    this.selectedImages = this.selectedImages.filter((img: any) => img !== image);
    URL.revokeObjectURL(image.url); // Libera el objeto URL
  }

  loadExistingPhotos() {
    this.fotosInmuebleService.getAllPhotosByInmueble(this.selectedInmuebleId).subscribe((fotos: FotoInmueble[])=>this.existingPhotos = fotos);
  }

  async removeExistingPhoto(image: FotoInmueble){
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar esta foto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.fotosInmuebleService.deletePhotoById(image.id_fotoInmueble).subscribe({
              next: () => {
                this.loadExistingPhotos();
              },
              error: (err) => {
                console.error('Error al cargar las fotos:', err);
                // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
              },
            });
          },
        },
      ],
    });

    await alert.present();
  }

}
