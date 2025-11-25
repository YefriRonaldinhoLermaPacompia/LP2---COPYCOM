import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TipoGeneracion } from 'src/app/models/tipo-generacion.model';
import { GeneracionService } from 'src/app/providers/services/catalog/generacion.service';

import { GeneracionDialogComponent } from './generacion-dialog/generacion-dialog.component';

@Component({
  selector: 'app-generacion',
  imports: [
    FormsModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './generacion.component.html',
  styleUrl: './generacion.component.scss'
})
export class GeneracionComponent implements OnInit {

  displayedColumns: string[] = [
    'nombreTipoGeneracion',
    'acciones'
  ];

  public tiposGeneracion: TipoGeneracion[] = [];
  isLoading: boolean = false;

  constructor(
    private generacionService: GeneracionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTiposGeneracion();
  }

  private getTiposGeneracion(): void {
    this.isLoading = true;

    this.generacionService.getAll$().subscribe(response => {
      this.tiposGeneracion = response;
      this.isLoading = false;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(GeneracionDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { tipo: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveTipo(result);
    });
  }

  private saveTipo(tipo: TipoGeneracion): void {
    this.generacionService.add$(tipo).subscribe(response => {
      if (response) {
        this.getTiposGeneracion();
      }
    });
  }

  openEditDialog(tipo: TipoGeneracion) {
    const dialogRef = this.dialog.open(GeneracionDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { tipo: tipo, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateTipo(tipo.id, result);
      }
    });
  }

  private updateTipo(id: number | undefined, tipo: TipoGeneracion) {
    this.generacionService.update$(id, tipo).subscribe(response => {
      if (response) {
        this.getTiposGeneracion();
      }
    });
  }

  deleteTipo(tipo: TipoGeneracion) {
    this.generacionService.delete$(tipo.id).subscribe({
      next: () => {
        this.tiposGeneracion = this.tiposGeneracion.filter(t => t.id !== tipo.id);
      },
      error: (err) => {
        console.error('Error eliminando tipo de generación:', err);
      }
    });
  }
}
