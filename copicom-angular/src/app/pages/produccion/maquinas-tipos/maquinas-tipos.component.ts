import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';

import { TipoMaquinaria } from 'src/app/models/tipo-maquinaria.model';
import { Maquina } from 'src/app/models/maquina.model';
import { TipoMaquinariaService } from 'src/app/providers/services/catalog/tipo-maquinaria.service';
import { MaquinaService } from 'src/app/providers/services/catalog/maquina.service';
import { TipoMaquinariaDialogComponent } from './tipo-maquinaria-dialog/tipo-maquinaria-dialog.component';
import { MaquinaDialogComponent } from './maquina-dialog/maquina-dialog.component';

@Component({
  selector: 'app-maquinas-tipos',
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
    MatTabsModule,
  ],
  templateUrl: './maquinas-tipos.component.html',
  styleUrl: './maquinas-tipos.component.scss'
})
export class MaquinasTiposComponent implements OnInit {

  // Tipos de Maquinaria
  displayedColumnsTipos: string[] = ['nombreTipoMaquinaria', 'acciones'];
  public tiposMaquinaria: TipoMaquinaria[] = [];
  isLoadingTipos: boolean = false;

  // Máquinas
  displayedColumnsMaquinas: string[] = ['nombreMaquina', 'tipoMaquinaria', 'fechaUltMantenimiento', 'acciones'];
  public maquinas: Maquina[] = [];
  isLoadingMaquinas: boolean = false;

  constructor(
    private tipoMaquinariaService: TipoMaquinariaService,
    private maquinaService: MaquinaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getTiposMaquinaria();
    this.getMaquinas();
  }

  // ========== TIPOS DE MAQUINARIA ==========
  private getTiposMaquinaria(): void {
    this.isLoadingTipos = true;
    this.tipoMaquinariaService.getAll$().subscribe({
      next: (response) => {
        this.tiposMaquinaria = response;
        this.isLoadingTipos = false;
      },
      error: (err) => {
        console.error('Error cargando tipos:', err);
        this.isLoadingTipos = false;
      }
    });
  }

  openCreateTipoDialog() {
    const dialogRef = this.dialog.open(TipoMaquinariaDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { tipoMaquinaria: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveTipoMaquinaria(result);
    });
  }

  private saveTipoMaquinaria(tipo: TipoMaquinaria): void {
    this.tipoMaquinariaService.add$(tipo).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Tipo de maquinaria creado exitosamente', 'Cerrar', { duration: 3000 });
          this.getTiposMaquinaria();
          this.getMaquinas(); // Recargar máquinas para actualizar referencias
        }
      },
      error: (err) => {
        console.error('Error guardando tipo:', err);
        this.snackBar.open('Error al crear tipo', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditTipoDialog(tipo: TipoMaquinaria) {
    const dialogRef = this.dialog.open(TipoMaquinariaDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { tipoMaquinaria: tipo, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditTipoMaquinaria(tipo.id, result);
      }
    });
  }

  private saveEditTipoMaquinaria(id: number | undefined, tipo: TipoMaquinaria) {
    this.tipoMaquinariaService.update$(id, tipo).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Tipo actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getTiposMaquinaria();
          this.getMaquinas();
        }
      },
      error: (err) => {
        console.error('Error actualizando tipo:', err);
        this.snackBar.open('Error al actualizar tipo', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteTipoMaquinaria(tipo: TipoMaquinaria) {
    if (confirm('¿Está seguro de eliminar este tipo? Esto eliminará también las máquinas asociadas.')) {
      this.tipoMaquinariaService.delete$(tipo.id).subscribe({
        next: () => {
          this.tiposMaquinaria = this.tiposMaquinaria.filter(t => t.id !== tipo.id);
          this.snackBar.open('Tipo eliminado exitosamente', 'Cerrar', { duration: 3000 });
          this.getMaquinas();
        },
        error: (err) => {
          console.error('Error eliminando tipo:', err);
          this.snackBar.open('Error al eliminar tipo', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  // ========== MÁQUINAS ==========
  private getMaquinas(): void {
    this.isLoadingMaquinas = true;
    this.maquinaService.getAll$().subscribe({
      next: (response) => {
        this.maquinas = response;
        this.isLoadingMaquinas = false;
      },
      error: (err) => {
        console.error('Error cargando máquinas:', err);
        this.isLoadingMaquinas = false;
      }
    });
  }

  openCreateMaquinaDialog() {
    const dialogRef = this.dialog.open(MaquinaDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { maquina: null, mode: 'create', tiposMaquinaria: this.tiposMaquinaria }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveMaquina(result);
    });
  }

  private saveMaquina(maquina: Maquina): void {
    this.maquinaService.add$(maquina).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Máquina creada exitosamente', 'Cerrar', { duration: 3000 });
          this.getMaquinas();
        }
      },
      error: (err) => {
        console.error('Error guardando máquina:', err);
        this.snackBar.open('Error al crear máquina', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditMaquinaDialog(maquina: Maquina) {
    const dialogRef = this.dialog.open(MaquinaDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { maquina: maquina, mode: 'edit', tiposMaquinaria: this.tiposMaquinaria }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditMaquina(maquina.id, result);
      }
    });
  }

  private saveEditMaquina(id: number | undefined, maquina: Maquina) {
    this.maquinaService.update$(id, maquina).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Máquina actualizada exitosamente', 'Cerrar', { duration: 3000 });
          this.getMaquinas();
        }
      },
      error: (err) => {
        console.error('Error actualizando máquina:', err);
        this.snackBar.open('Error al actualizar máquina', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteMaquina(maquina: Maquina) {
    if (confirm('¿Está seguro de eliminar esta máquina?')) {
      this.maquinaService.delete$(maquina.id).subscribe({
        next: () => {
          this.maquinas = this.maquinas.filter(m => m.id !== maquina.id);
          this.snackBar.open('Máquina eliminada exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error eliminando máquina:', err);
          this.snackBar.open('Error al eliminar máquina', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  getNombreTipo(tipoMaquinariaId?: number): string {
    if (!tipoMaquinariaId) return 'N/A';
    const tipo = this.tiposMaquinaria.find(t => t.id === tipoMaquinariaId);
    return tipo?.nombreTipoMaquinaria || 'N/A';
  }
}
