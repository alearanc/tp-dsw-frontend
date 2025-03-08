import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { PersonaService } from 'src/app/services/persona/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recovery-account',
  templateUrl: './recovery-account.page.html',
  styleUrls: ['./recovery-account.page.scss'],
})
export class RecoveryAccountPage implements OnInit {

  recoveryForm!: FormGroup;
  recoveryError: string | null = null;
  recoverySuccess: boolean = false;

  constructor(private fb: FormBuilder, private personaService: PersonaService, private router: Router) { }

  ngOnInit() {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  recover() {
    if (this.recoveryForm.valid) {
      this.recoverySuccess = true;
      const email = this.recoveryForm.value.email;
      this.personaService.recoverAccount(email).pipe(
        catchError((error) => {
          this.recoveryError = error.error.message || 'Error al recuperar la cuenta. Por favor, inténtelo de nuevo.';
          this.recoverySuccess = false;
          return throwError(error);
        })
      ).subscribe((res: any) => {
        Swal.fire({
          title: 'Éxito', text: 'Cuenta recuperada con éxito', icon: 'success', heightAuto: false
        }).then(() => this.router.navigate(['/login']));
        this.recoveryError = null;
      });
    }
  }

}
