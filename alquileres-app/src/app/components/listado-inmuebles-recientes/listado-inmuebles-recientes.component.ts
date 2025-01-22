import { Component, OnInit } from '@angular/core';
import Inmueble from 'src/app/models/Inmueble';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-listado-inmuebles-recientes',
  templateUrl: './listado-inmuebles-recientes.component.html',
  styleUrls: ['./listado-inmuebles-recientes.component.scss'],
})
export class ListadoInmueblesRecientesComponent  implements OnInit {

  inmuebles: Inmueble[] = [];

  sinResultados = false;

  constructor(private inmueblesService: InmuebleService, private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.inmueblesService.getInmueblesSinReservas().subscribe((inmuebles: Inmueble[]) => {
        this.inmuebles = inmuebles;
        if(this.inmuebles.length === 0) {
          this.sinResultados = true;
        }
      });
    }else{
    this.inmueblesService.getAllInmuebles().subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
      if(this.inmuebles.length === 0) {
          this.sinResultados = true;
        }
    });
  }
  }

}
