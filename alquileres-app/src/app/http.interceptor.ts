import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class httpInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = localStorage.getItem('authToken');
        let authReq = req;

        // Add the token to the headers if it exists
        if (authToken) {
            authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }

        // Prepend the backend URL to the request URL
        const apiReq = authReq.clone({ url: `${environment.backendUrl}${authReq.url}` });

        return next.handle(apiReq);
    }
}