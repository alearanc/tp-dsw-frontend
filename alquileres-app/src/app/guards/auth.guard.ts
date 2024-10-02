// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { CustomNavControllerService } from '../services/custom-router.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: CustomNavControllerService) { }

    canActivate(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        } else {
            this.router.navigateForward(['/login']);
            return false;
        }
    }
}