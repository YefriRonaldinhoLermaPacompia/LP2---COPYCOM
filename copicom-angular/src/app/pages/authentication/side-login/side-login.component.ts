import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../../../providers/services/auth/auth.service';
import { AuthResponse } from '../../../models/auth.model';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService) { }

  get f() {
    return this.form.controls;
  }

  submit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (response: AuthResponse) => {
        this.authService.setAccessToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error("Error en login:", err);
        alert("Credenciales incorrectas o error de conexión.");
      }
    });

  }
}
