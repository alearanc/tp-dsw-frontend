import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { PersonaService } from 'src/app/services/persona/persona.service';

@Component({
  selector: 'app-recovery-account',
  templateUrl: './recovery-account.page.html',
  styleUrls: ['./recovery-account.page.scss'],
})
export class RecoveryAccountPage implements OnInit {

  recoveryForm!: FormGroup;
  recoveryError: string | null = null;
  recoverySuccess: string | null = null;

  constructor(private fb: FormBuilder, private router: CustomNavControllerService, private personaService: PersonaService) { }

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recover() {
    if (this.recoveryForm.valid) {
      const email = this.recoveryForm.value.email;
      this.personaService.recoverAccount(email).pipe(
        catchError((error) => {
          this.recoveryError = error.error.message || 'Error al recuperar la cuenta. Por favor, inténtelo de nuevo.';
          return throwError(error);
        })
      ).subscribe((res: any) => {
        this.recoverySuccess = 'Correo de recuperación enviado. Por favor, revisa tu bandeja de entrada.';
        this.recoveryError = null;
      });
    }
  }

  navigateToLogin() {
    this.router.navigateForward('/login');
  }

  navigateToSignup() {
    this.router.navigateForward('/signup');
  }

}
