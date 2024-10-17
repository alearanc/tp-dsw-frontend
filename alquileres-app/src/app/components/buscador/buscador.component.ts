import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent  implements OnInit {

  busqueda = new FormControl('');

  constructor(private router: CustomNavControllerService) { }

  ngOnInit() {}

  buscar(event: any) {
    event.preventDefault();
    this.router.navigateForward(['/search'], { queryParams: { criteria: this.busqueda.value } });
  }

}
