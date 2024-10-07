// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;
  esPropietario: boolean = false;

  constructor(private authService: AuthService, private router: CustomNavControllerService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    // Conseguir la informacion del user desde el token
    const info_usuario: any = jwtDecode(localStorage.getItem('authToken')!); //Esto solo nos da el id_usuario
    console.log(info_usuario.id_usuario);
    this.esPropietario = this.authService.getUserType() === "Propietario";
  }

  navigateCeInmueble(param?: String){
    this.router.navigateForward(['/ce-inmueble'], { queryParams: { idInmueble: param } });
  }
}