import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { AuthService } from './services/auth/auth.service';

// Inyecto el AuthService manualmente porque no uso una clase
export function authInterceptor(req: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService): Observable<HttpEvent<any>> {
    if (req.url.includes('persona/signin')) {
        return next(req); // Solucion task #93 en trello
    }

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {
                Swal.fire({
                    title: 'Sesión expirada',
                    text: 'Su sesión ha expirado. Por favor, inicie sesión nuevamente.',
                    icon: 'warning',
                    heightAuto: false,
                    confirmButtonColor: '#000',
                    confirmButtonText: 'Confirmar'
                }).then(() => {
                    authService.signout();
                });
            }
            return throwError(() => error);
        })
    );
}