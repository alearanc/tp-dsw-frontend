import { Component, OnInit } from '@angular/core';
import Inmueble from 'src/app/models/Inmueble';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  inmuebles: Inmueble[] = [];

  constructor(private inmueblesService: InmuebleService, private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.isAuthenticated()) {
      this.inmueblesService.getInmueblesSinReservas().subscribe((inmuebles: Inmueble[]) => {
        this.inmuebles = inmuebles;
      });
    }else{
    this.inmueblesService.getAllInmuebles().subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
    });
  }
  }

}
