import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { AuthService } from '../../services/auth/auth.service';
import { AppStateService } from 'src/app/services/appstate/app-state.service';

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
    private popoverController: PopoverController,
    private router: CustomNavControllerService
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

  navigateTo(path: string, queryParams: any = {}) {
    this.router.navigateRoot([path], { queryParams });
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

@Component({
  selector: 'app-popover-content',
  templateUrl: './popover-content.component.html',
  styleUrls: ['./header.component.scss'],
})
export class PopoverContentComponent {
  @Input() userFullName: string = '';
  @Input() signout!: () => void;

  constructor(
    private router: CustomNavControllerService,
    private popoverController: PopoverController
  ) {}

  async navigateToProfile() {
    await this.popoverController.dismiss();
    this.router.navigateRoot(['/dashboard']);
  }
}
