import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'categoria-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {

  @Input() categoria!: string;
  @Input() idCategoria!: number;
  @Input() tipoLink!: string;

  constructor(private router: Router) { }

  navigateSearchByCategoria() {
    this.router.navigate(['search'], { queryParams: { [this.tipoLink]: this.idCategoria } });
  }

}
