import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { ResetPasswordPage } from './reset-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    CustomComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
