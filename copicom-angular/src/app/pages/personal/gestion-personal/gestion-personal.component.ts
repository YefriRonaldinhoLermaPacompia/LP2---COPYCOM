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

import { Trabajador } from 'src/app/models/trabajador.model';
import { TrabajadorService } from 'src/app/providers/services/catalog/trabajador.service';
import { TrabajadorDialogComponent } from './trabajador-dialog/trabajador-dialog.component';

@Component({
  selector: 'app-gestion-personal',
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
  templateUrl: './gestion-personal.component.html',
  styleUrl: './gestion-personal.component.scss'
})
export class GestionPersonalComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'dni', 'celular', 'correo', 'acciones'];
  public trabajadores: Trabajador[] = [];
  isLoading: boolean = false;

  constructor(
    private trabajadorService: TrabajadorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTrabajadores();
  }

  private getTrabajadores(): void {
    this.isLoading = true;
    this.trabajadorService.getAll$().subscribe({
      next: (response) => {
        this.trabajadores = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando trabajadores:', err);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TrabajadorDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { trabajador: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveTrabajador(result);
    });
  }

  private saveTrabajador(trabajador: Trabajador): void {
    this.trabajadorService.add$(trabajador).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Trabajador registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.getTrabajadores();
        }
      },
      error: (err) => {
        console.error('Error guardando trabajador:', err);
        this.snackBar.open('Error al registrar trabajador', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditDialog(trabajador: Trabajador) {
    const dialogRef = this.dialog.open(TrabajadorDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { trabajador: trabajador, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditTrabajador(trabajador.id, result);
      }
    });
  }

  private saveEditTrabajador(id: number | undefined, trabajador: Trabajador) {
    this.trabajadorService.update$(id, trabajador).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Trabajador actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getTrabajadores();
        }
      },
      error: (err) => {
        console.error('Error actualizando trabajador:', err);
        this.snackBar.open('Error al actualizar trabajador', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteTrabajador(trabajador: Trabajador) {
    if (confirm('¿Está seguro de eliminar este trabajador?')) {
      this.trabajadorService.delete$(trabajador.id).subscribe({
        next: () => {
          this.trabajadores = this.trabajadores.filter(t => t.id !== trabajador.id);
          this.snackBar.open('Trabajador eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error eliminando trabajador:', err);
          this.snackBar.open('Error al eliminar trabajador', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
