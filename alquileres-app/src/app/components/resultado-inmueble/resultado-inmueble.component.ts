import { Component, Input, OnInit } from '@angular/core';
import Inmueble from 'src/app/models/Inmueble';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';

@Component({
  selector: 'app-resultado-inmueble',
  templateUrl: './resultado-inmueble.component.html',
  styleUrls: ['./resultado-inmueble.component.scss'],
})
export class ResultadoInmuebleComponent  implements OnInit {
  
  @Input() inmuebleActual!: Inmueble;

  constructor(private router: CustomNavControllerService) { }

  ngOnInit() {}

  getCalificacionPromedio(){
    //deberíamos agarrar las reservas y hacer un AVG de las calificaciones.
    //o bien podríamos tener en nuestro inmueble un atributo "calificacionPromedio"
    //que se actualice cada vez que se haga una reserva.
    // return Math.random() * 5;
    return 3;
  }

  navigateToInmuebleDetails(id_inmueble: number){
    this.router.navigateForward(['/inmueble/' + id_inmueble]);
  }

}
