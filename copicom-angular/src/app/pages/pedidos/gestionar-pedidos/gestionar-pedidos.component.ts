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
import { MatChipsModule } from '@angular/material/chips';

import { Pedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/providers/services/catalog/pedido.service';
import { PedidoDialogComponent } from './pedido-dialog/pedido-dialog.component';

@Component({
  selector: 'app-gestionar-pedidos',
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
    MatChipsModule,
  ],
  templateUrl: './gestionar-pedidos.component.html',
  styleUrl: './gestionar-pedidos.component.scss'
})
export class GestionarPedidosComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'clienteNombre', 'fechaPedido', 'totalPedido', 'estado', 'acciones'];
  public pedidos: Pedido[] = [];
  isLoading: boolean = false;

  constructor(
    private pedidoService: PedidoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPedidos();
  }

  private getPedidos(): void {
    this.isLoading = true;
    this.pedidoService.getAll$().subscribe({
      next: (response) => {
        this.pedidos = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando pedidos:', err);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      disableClose: true,
      data: { pedido: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.savePedido(result);
    });
  }

  private savePedido(pedido: Pedido): void {
    this.pedidoService.add$(pedido).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Pedido creado exitosamente', 'Cerrar', { duration: 3000 });
          this.getPedidos();
        }
      },
      error: (err) => {
        console.error('Error guardando pedido:', err);
        this.snackBar.open('Error al crear pedido', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditDialog(pedido: Pedido) {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      disableClose: true,
      data: { pedido: pedido, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditPedido(pedido.id, result);
      }
    });
  }

  private saveEditPedido(id: number | undefined, pedido: Pedido) {
    this.pedidoService.update$(id, pedido).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Pedido actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getPedidos();
        }
      },
      error: (err) => {
        console.error('Error actualizando pedido:', err);
        this.snackBar.open('Error al actualizar pedido', 'Cerrar', { duration: 3000 });
      }
    });
  }

  cambiarEstado(pedido: Pedido, nuevoEstado: string) {
    if (confirm(`¿Cambiar estado a "${nuevoEstado}"?`)) {
      this.pedidoService.actualizarEstado$(pedido.id!, nuevoEstado).subscribe({
        next: (response) => {
          this.snackBar.open('Estado actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getPedidos();
        },
        error: (err) => {
          console.error('Error actualizando estado:', err);
          this.snackBar.open('Error al actualizar estado', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  deletePedido(pedido: Pedido) {
    if (confirm('¿Está seguro de eliminar este pedido?')) {
      this.pedidoService.delete$(pedido.id).subscribe({
        next: () => {
          this.pedidos = this.pedidos.filter(p => p.id !== pedido.id);
          this.snackBar.open('Pedido eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error eliminando pedido:', err);
          this.snackBar.open('Error al eliminar pedido', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  getEstadoColor(estado?: string): string {
    switch (estado) {
      case 'ENTREGADO': return 'primary';
      case 'EN_PRODUCCION': return 'accent';
      case 'CANCELADO': return 'warn';
      default: return '';
    }
  }
}
