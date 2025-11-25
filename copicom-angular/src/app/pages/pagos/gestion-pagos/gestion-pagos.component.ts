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

import { Pago } from 'src/app/models/pago.model';
import { PagoService } from 'src/app/providers/services/catalog/pago.service';
import { PagoDialogComponent } from './pago-dialog/pago-dialog.component';

@Component({
  selector: 'app-gestion-pagos',
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
  templateUrl: './gestion-pagos.component.html',
  styleUrl: './gestion-pagos.component.scss'
})
export class GestionPagosComponent implements OnInit {

  displayedColumns: string[] = ['modo', 'monto', 'fechaPago', 'ventaId', 'acciones'];
  public pagos: Pago[] = [];
  isLoading: boolean = false;

  constructor(
    private pagoService: PagoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPagos();
  }

  private getPagos(): void {
    this.isLoading = true;
    this.pagoService.getAll$().subscribe({
      next: (response) => {
        this.pagos = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando pagos:', err);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PagoDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { pago: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.savePago(result);
    });
  }

  private savePago(pago: Pago): void {
    this.pagoService.add$(pago).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Pago registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.getPagos();
        }
      },
      error: (err) => {
        console.error('Error guardando pago:', err);
        this.snackBar.open('Error al registrar pago', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditDialog(pago: Pago) {
    const dialogRef = this.dialog.open(PagoDialogComponent, {
      width: '500px',
      disableClose: true,
      data: { pago: pago, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditPago(pago.id, result);
      }
    });
  }

  private saveEditPago(id: number | undefined, pago: Pago) {
    this.pagoService.update$(id, pago).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Pago actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getPagos();
        }
      },
      error: (err) => {
        console.error('Error actualizando pago:', err);
        this.snackBar.open('Error al actualizar pago', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deletePago(pago: Pago) {
    if (confirm('¿Está seguro de eliminar este pago?')) {
      this.pagoService.delete$(pago.id).subscribe({
        next: () => {
          this.pagos = this.pagos.filter(p => p.id !== pago.id);
          this.snackBar.open('Pago eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error eliminando pago:', err);
          this.snackBar.open('Error al eliminar pago', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}

