import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-super-admin-menu',
  templateUrl: './super-admin-menu.page.html',
  styleUrls: ['./super-admin-menu.page.scss'],
})
export class SuperAdminMenuPage {

  constructor(private router: Router) { }

  navigateTo(urlRoute: string){
    this.router.navigate([urlRoute]);
  }

}
