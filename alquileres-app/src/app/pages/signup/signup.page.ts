// signup.page.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomNavControllerService } from 'src/app/services/custom-router.service';
import { PersonaService } from '../../services/persona/persona.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showRepeatPassword = false;

  constructor(private fb: FormBuilder, private personaService: PersonaService, private router: CustomNavControllerService) {}

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
      console.log('Form Data:', formData);
      this.personaService.addPersona(formData).subscribe((res: any) => { //No se ni que esperar del backend xD
        this.router.navigateForward(['/home']);
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRepeatPasswordVisibility() {
    this.showRepeatPassword = !this.showRepeatPassword;
  }

  navigateToLogin() {
    this.router.navigateForward(['/login']);
  }
}