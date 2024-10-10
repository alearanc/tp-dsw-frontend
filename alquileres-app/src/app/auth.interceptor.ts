import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth/auth.service'; // Asegúrate de importar tu AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    Swal.fire({
                        title: 'Sesión expirada',
                        text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
                        icon: 'warning',
                        confirmButtonColor: '#000',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        this.authService.signout(); // Llama al método para cerrar sesión
                    });
                }
                return throwError(error);
            })
        );
    }
}