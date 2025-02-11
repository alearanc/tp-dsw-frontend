import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuperAdminMenuPageRoutingModule } from './super-admin-menu-routing.module';

import { SuperAdminMenuPage } from './super-admin-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuperAdminMenuPageRoutingModule
  ],
  declarations: [SuperAdminMenuPage]
})
export class SuperAdminMenuPageModule {}
