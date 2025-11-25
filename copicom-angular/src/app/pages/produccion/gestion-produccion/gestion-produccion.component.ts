import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-gestion-produccion',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
  ],
  template: `
    <mat-card class="cardWithShadow">
      <mat-card-content>
        <h2>Gestión de Producción</h2>
        <p>Funcionalidad en desarrollo...</p>
      </mat-card-content>
    </mat-card>
  `
})
export class GestionProduccionComponent implements OnInit {
  ngOnInit(): void {
  }
}

