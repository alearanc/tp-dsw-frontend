import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-registrarse',
  templateUrl: './hero-registrarse.component.html',
  styleUrls: ['./hero-registrarse.component.scss'],
})
export class HeroRegistrarseComponent {

  constructor(private router: Router){}

  isLoading = true;

  onImageLoad(): void {
    this.isLoading = false;
  }

  navigateSignup() {
    this.router.navigate(['/signup']);
  }

}
