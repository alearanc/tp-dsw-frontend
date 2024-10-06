// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CustomNavControllerService } from '../custom-router.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authState = new BehaviorSubject<boolean>(this.isAuthenticated());

  constructor(private httpClient: HttpClient, private router: CustomNavControllerService) {}

  signin(email: string, password: string): Observable<any> {
    return this.httpClient.post('persona/signin', { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('authToken', response.token.token);
          localStorage.setItem('user', JSON.stringify(response.token.user));
          this.authState.next(true);
        }
      })
    );
  }

  signout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.authState.next(false);
    this.router.navigateForward(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getAuthState() {
    return this.authState.asObservable();
  }

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(){
    const ui: any = jwtDecode(localStorage.getItem('authToken')!);
    return ui.id_usuario;
  }
}