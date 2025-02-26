import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth/auth.service';

// Inyecto el AuthService manualmente porque no uso una clase
export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
    return next(req).pipe(
        catchError((error) => {
            // Si me llega un 401, muestro el cartel y cierro sesión
            if (error.status === 401) {
                Swal.fire({
                    title: 'Sesión expirada',
                    text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
                    icon: 'warning',
                    confirmButtonColor: '#000',
                    confirmButtonText: 'Confirmar'
                }).then(() => {
                    authService.signout(); // Cierro la sesión
                });
            }
            // Devuelvo el error para que la cadena siga
            return throwError(() => error);
        })
    );
}