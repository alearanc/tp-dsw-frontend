import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-buscador',
  templateUrl: './hero-buscador.component.html',
  styleUrls: ['./hero-buscador.component.scss'],
})
export class HeroBuscadorComponent {

  isLoading = true;

  onImageLoad(): void {
    this.isLoading = false;
  }

}
