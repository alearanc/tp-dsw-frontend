// login.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: CustomNavControllerService, private navCtrl: NavController) {}

  error = false;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.signin(email, password).subscribe(
        (response) => {
          console.log('Login successful');
          this.router.navigateRoot(['/dashboard']);
        },
        (error) => {
          this.error = true;
          this.loginForm.controls['password'].setErrors({ incorrect: true });
        }
      );
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup() {
    this.navCtrl.navigateForward('/signup', { animated: false });
  }
}