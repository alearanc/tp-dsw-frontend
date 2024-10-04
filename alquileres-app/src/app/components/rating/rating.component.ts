import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnChanges {
  @Input() calificacionPromedio: number = 0;
  estrellas: string[] = [];

  ngOnChanges() {
    this.generarEstrellas();
  }

  generarEstrellas() {
    this.estrellas = [];
    const estrellasLlenas = Math.floor(this.calificacionPromedio);
    const estrellasVacias = 5 - estrellasLlenas;

    for (let i = 0; i < estrellasLlenas; i++) {
      this.estrellas.push('star');
    }
    for (let i = 0; i < estrellasVacias; i++) {
      this.estrellas.push('star-outline');
    }
  }
}