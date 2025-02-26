// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { authInterceptor } from './auth.interceptor';
import { httpInterceptor } from './http.interceptor';
import { CustomComponentsModule } from './components/custom-components.module';
import { CustomNavControllerService } from './services/custom-router.service';
import { CalificarModalComponent } from './components/rating/calificar-modal.component';
import { AuthService } from './services/auth/auth.service';

@NgModule({
  declarations: [AppComponent, CalificarModalComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    CustomComponentsModule,
    ReactiveFormsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CustomNavControllerService,
    AuthService, // Agrego el AuthService como provider
    provideHttpClient(
      withInterceptors([
        httpInterceptor,
        // Debería funcionar así
        (req, next) => authInterceptor(req, next, inject(AuthService))
      ])
    ),
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}