import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Inmueble } from 'src/app/models/Inmueble';
import { Reserva } from 'src/app/models/Reserva';
import { InmuebleService } from 'src/app/services/inmueble/inmueble.service';
import { ReservasService } from 'src/app/services/reservas/reservas.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  reservas: Reserva[] = [];
  reservasPasadas: Reserva[] = [];
  reservasCanceladas: Reserva[] = [];
  inmuebles: Inmueble[] = [];
  esPropietario: boolean = false;
  tab: string = 'futuras';

  constructor(private authService: AuthService, private router: Router, private reservaService: ReservasService, private inmuebleService: InmuebleService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    // Conseguir la informacion del user desde el token
    const info_usuario: any = jwtDecode(localStorage.getItem('authToken')!); //Esto solo nos da el id_usuario
    this.esPropietario = this.authService.getUserType() === "Propietario";
    this.getMisReservas();
    this.getMisReservasPasadas();
    this.getMisReservasCanceladas();
    this.inmuebleService.getMisInmuebles().subscribe((inmuebles: Inmueble[]) => {
      this.inmuebles = inmuebles;
    });
  }

  reloadReservas(){
    this.getMisReservas();
    this.getMisReservasCanceladas();
  }

  getMisReservas(){
    this.reservaService.getReservas().subscribe((reservas: Reserva[]) => {
      this.reservas = reservas;
    });
  }

  getMisReservasPasadas(){
    this.reservaService.getReservasPasadas().subscribe((reservas: Reserva[]) => {
      this.reservasPasadas = reservas;
    });
  }

  getMisReservasCanceladas(){
    this.reservaService.getReservasCanceladas().subscribe((reservas: Reserva[]) => {
      this.reservasCanceladas = reservas;
    });
  }

  navigateCeInmueble(param?: String){
    this.router.navigate(['/ce-inmueble'], { queryParams: { idInmueble: param } });
  }
}