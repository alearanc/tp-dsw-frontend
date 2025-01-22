import { Component, HostListener, OnInit } from '@angular/core';
import { AppStateService } from './services/appstate/app-state.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  menuItems = this.appState.menuItems;

  constructor(private appState: AppStateService, private router: Router, private menuCtrl: MenuController) {}

  ngOnInit() {
    this.updateMenuState();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateMenuState();
  }

  private updateMenuState(): void {
    const isMobileView = window.innerWidth < 992;
    this.menuCtrl.enable(isMobileView, '1');
  }

  navigateTo(path: string, queryParams: any = {}) {
    this.router.navigate([path], {queryParams});
  }
}
