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

import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/providers/services/catalog/servicio.service';

import { ServicioDialogComponent } from './servicio-dialog/servicio-dialog.component';

@Component({
  selector: 'app-servicio',
  standalone: true,
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
  templateUrl: './servicio.component.html',
  styleUrl: './servicio.component.scss'
})
export class ServicioComponent implements OnInit {

  displayedColumns: string[] = [
    'nombreServicio',
    'descripcion',
    'precioUnitario',
    'cantidad',
    'acciones'
  ];

  public servicios: Servicio[] = [];
  isLoading: boolean = false;

  constructor(
    private servicioService: ServicioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getServicios();
  }

  private getServicios(): void {
    this.isLoading = true;

    this.servicioService.getAll$().subscribe(response => {
      this.servicios = Array.isArray(response) ? response : [response];
      this.isLoading = false;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ServicioDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { servicio: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveServicio(result);
    });
  }

  private saveServicio(servicio: Servicio) {
    this.servicioService.add$(servicio).subscribe(response => {
      if (response) {
        this.getServicios();
      }
    });
  }

  openEditDialog(servicio: Servicio): void {
    const dialogRef = this.dialog.open(ServicioDialogComponent, {
      width: '650px',
      disableClose: true,
      data: { servicio: servicio, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditServicio(servicio.id, result);
      }
    });
  }

  private saveEditServicio(id: number | undefined, servicio: Servicio) {
    this.servicioService.update$(id, servicio).subscribe(response => {
      if (response) {
        this.getServicios();
      }
    });
  }

  deleteServicio(servicio: Servicio): void {
    this.servicioService.delete$(servicio.id).subscribe({
      next: () => {
        this.servicios = this.servicios.filter(s => s.id !== servicio.id);
      },
      error: (err) => {
        console.error('Error al eliminar servicio:', err);
      }
    });
  }
}
