import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-registrar-pago',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="cardWithShadow">
      <mat-card-content>
        <h2>Registrar Pago</h2>
        <p>Funcionalidad en desarrollo...</p>
      </mat-card-content>
    </mat-card>
  `
})
export class RegistrarPagoComponent {}

