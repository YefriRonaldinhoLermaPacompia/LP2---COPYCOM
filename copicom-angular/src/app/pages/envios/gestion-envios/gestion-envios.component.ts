import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Envio } from 'src/app/models/envio.model';
import { EnvioService } from 'src/app/providers/services/catalog/envio.service';
import { EnvioDialogComponent } from './envio-dialog/envio-dialog.component';

@Component({
  selector: 'app-gestion-envios',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './gestion-envios.component.html',
  styleUrl: './gestion-envios.component.scss'
})
export class GestionEnviosComponent implements OnInit {

  displayedColumns: string[] = ['codigoRastreo', 'departamento', 'provincia', 'fechaEnvio', 'estado', 'acciones'];
  public envios: Envio[] = [];
  isLoading: boolean = false;

  constructor(
    private envioService: EnvioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getEnvios();
  }

  private getEnvios(): void {
    this.isLoading = true;
    this.envioService.getAll$().subscribe({
      next: (response) => {
        this.envios = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando envíos:', err);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(EnvioDialogComponent, {
      width: '700px',
      disableClose: true,
      data: { envio: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveEnvio(result);
    });
  }

  private saveEnvio(envio: Envio): void {
    this.envioService.add$(envio).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Envío registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.getEnvios();
        }
      },
      error: (err) => {
        console.error('Error guardando envío:', err);
        this.snackBar.open('Error al registrar envío', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditDialog(envio: Envio) {
    const dialogRef = this.dialog.open(EnvioDialogComponent, {
      width: '700px',
      disableClose: true,
      data: { envio: envio, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditEnvio(envio.id, result);
      }
    });
  }

  private saveEditEnvio(id: number | undefined, envio: Envio) {
    this.envioService.update$(id, envio).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Envío actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getEnvios();
        }
      },
      error: (err) => {
        console.error('Error actualizando envío:', err);
        this.snackBar.open('Error al actualizar envío', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteEnvio(envio: Envio) {
    if (confirm('¿Está seguro de eliminar este envío?')) {
      this.envioService.delete$(envio.id).subscribe({
        next: () => {
          this.envios = this.envios.filter(e => e.id !== envio.id);
          this.snackBar.open('Envío eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error eliminando envío:', err);
          this.snackBar.open('Error al eliminar envío', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  getEstado(envio: Envio): string {
    if (envio.fechaEntrega) return 'ENTREGADO';
    if (envio.fechaEnvio) return 'EN_TRANSITO';
    return 'PENDIENTE';
  }
}
