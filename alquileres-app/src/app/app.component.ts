import { Component, OnInit } from '@angular/core';
import { AppStateService } from './services/appstate/app-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  menuItems = this.appState.menuItems;

  constructor(private appState: AppStateService) {}
}