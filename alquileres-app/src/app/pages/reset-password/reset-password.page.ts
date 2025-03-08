import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PersonaService } from '../../services/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetPasswordForm!: FormGroup;
  resetError: string | null = null;
  resetSuccess: string | null = null;
  token!: string;
  showPassword = false;
  showRepeatPassword = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private personaService: PersonaService
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParams['token'];
    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  resetPassword() {
    if (this.resetPasswordForm.valid) {
      const newPassword = this.resetPasswordForm.value.newPassword;
      this.personaService.resetPassword(this.token, newPassword).pipe(
        catchError((error) => {
          this.resetError = error.error.message || 'Error al restablecer la contraseña. Por favor, inténtelo de nuevo.';
          return throwError(error);
        })
      ).subscribe((res: any) => {
        Swal.fire({
          title: 'Éxito', text: 'Contraseña restablecida con éxito', icon: 'success', heightAuto: false}).then(() => {
          this.router.navigate(['/login']);
          })
        this.resetError = null;
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }
}