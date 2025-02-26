import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { AppStateService } from 'src/app/services/appstate/app-state.service';
import { PopoverContentComponent } from './popover-content.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userInitials: string = '';
  userFullName: string = '';
  isAuthenticated: boolean = false;
  private authSubscription!: Subscription;
  
  menuItems = this.appSate.menuItems;

  constructor(
    private appSate: AppStateService,
    private authService: AuthService,
    private popoverController: PopoverController
  ) {}

  ngOnInit() {
    this.authSubscription = this.authService
      .getAuthState()
      .subscribe((isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        if (this.isAuthenticated) {
          const user = this.getUserFromLocalStorage();
          if (user) {
            this.userInitials = this.getUserInitials(
              user.nombre,
              user.apellido
            );
            this.userFullName = `${user.nombre} ${user.apellido}`;
          }
        } else {
          this.userInitials = '';
          this.userFullName = '';
        }
      });
  }

  getUserFromLocalStorage() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  signout() {
    this.authService.signout();
  }

  getUserInitials(nombre: string, apellido: string): string {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverContentComponent,
      event: ev,
      translucent: true,
      componentProps: {
        userFullName: this.userFullName,
        signout: () => {
          this.signout();
          this.popoverController.dismiss();
        },
      },
    });
    await popover.present();
  }
}