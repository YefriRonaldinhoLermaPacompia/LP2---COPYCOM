import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gestionar-produccion',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  template: `
    <mat-card class="cardWithShadow">
      <mat-card-content>
        <h2>Gestionar Producción</h2>
        <p>Funcionalidad en desarrollo...</p>
      </mat-card-content>
    </mat-card>
  `
})
export class GestionarProduccionComponent {}

