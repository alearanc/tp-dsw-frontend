// custom-components.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent, PopoverContentComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, PopoverContentComponent],
  imports: [CommonModule, IonicModule.forRoot(),],
  exports: [HeaderComponent, PopoverContentComponent]
})
export class CustomComponentsModule {}