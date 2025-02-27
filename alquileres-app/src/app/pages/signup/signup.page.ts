// signup.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { PersonaService } from '../../services/persona/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showRepeatPassword = false;
  error!: string;

  constructor(private fb: FormBuilder, private personaService: PersonaService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      telefono: ['', Validators.required],
      domicilio: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')!.value === form.get('repeatPassword')!.value ? null : { mismatch: true };
  }

  signup() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;
      this.personaService.addPersona(formData).pipe(
        catchError((error) => {
          this.error = error.error;
          this.signupForm.setErrors({ invalid: true });
          return throwError(error);
        })
      ).subscribe((res: any) => {
        this.router.navigate(['/home']);
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