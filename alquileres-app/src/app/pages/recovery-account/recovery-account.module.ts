import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecoveryAccountPageRoutingModule } from './recovery-account-routing.module';

import { CustomComponentsModule } from 'src/app/components/custom-components.module';
import { RecoveryAccountPage } from './recovery-account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecoveryAccountPageRoutingModule,
    CustomComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [RecoveryAccountPage]
})
export class RecoveryAccountPageModule {}
