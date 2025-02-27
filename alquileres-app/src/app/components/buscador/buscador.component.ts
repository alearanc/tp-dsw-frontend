import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss'],
})
export class BuscadorComponent  implements OnInit {

  busqueda = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit() {}

  buscar(event: any) {
    event.preventDefault();
    this.router.navigate(['/search'], { queryParams: { criteria: this.busqueda.value } });
  }

}
