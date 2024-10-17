import { Component, Input } from '@angular/core';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';

@Component({
  selector: 'categoria-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {

  @Input() categoria!: string;
  @Input() idCategoria!: number;
  @Input() tipoLink!: string;

  constructor(private router: CustomNavControllerService) { }

  navigateSearchByCategoria() {
    this.router.navigateRoot(['search'], { queryParams: { [this.tipoLink]: this.idCategoria } });
  }

}
