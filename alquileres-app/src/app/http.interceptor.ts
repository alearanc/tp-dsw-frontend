import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Exporto una función pura en lugar de una clase
export function httpInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    const authToken = localStorage.getItem('authToken');
    let authReq = req;

    // Si tengo un token, lo agrego a los headers
    if (authToken) {
        authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`
            }
        });
    }

    // Le pongo la URL del backend adelante de la request
    const apiReq = authReq.clone({ url: `${environment.backendUrl}${authReq.url}` });

    // Paso la request al siguiente handler
    return next(apiReq);
}