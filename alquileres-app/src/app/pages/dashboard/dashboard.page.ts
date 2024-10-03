// dashboard.page.ts
import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    // Conseguir la informacion del user desde el token
    const info_usuario: any = jwtDecode(localStorage.getItem('authToken')!); //Esto solo nos da el id_usuario
    console.log(info_usuario.id_usuario);
  }
}