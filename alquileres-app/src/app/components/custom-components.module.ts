// custom-components.module.ts
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent, PopoverContentComponent } from './header/header.component';

@NgModule({
  declarations: [HeaderComponent, PopoverContentComponent, FooterComponent],
  imports: [CommonModule, IonicModule.forRoot(),],
  exports: [HeaderComponent, PopoverContentComponent, FooterComponent]
})
export class CustomComponentsModule {}