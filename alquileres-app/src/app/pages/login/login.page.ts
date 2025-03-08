import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  loginFlag = false

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  error = false;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    this.loginFlag = true;
    if (this.loginForm.valid) {
        const { email, password } = this.loginForm.value;
        this.authService.signin(email, password).subscribe({
            next: (response) => {
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.loginFlag  = false;
                this.error = true;
                if (err.status === 401) {
                    this.loginForm.controls['password'].setErrors({ incorrect: true });
                } else {
                    console.error('Error inesperado:', err);
                }
            }
        });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}