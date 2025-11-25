import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Pedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/providers/services/catalog/pedido.service';
import { PedidoDialogComponent } from '../gestionar-pedidos/pedido-dialog/pedido-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
  ],
  templateUrl: './registrar-pedido.component.html',
  styleUrl: './registrar-pedido.component.scss'
})
export class RegistrarPedidoComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Abrir el diálogo automáticamente al cargar
    this.openCreateDialog();
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      disableClose: true,
      data: { pedido: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        // Si canceló, volver a la gestión de pedidos
        this.router.navigate(['/pedidos/gestion']);
        return;
      }
      this.savePedido(result);
    });
  }

  private savePedido(pedido: Pedido): void {
    this.pedidoService.add$(pedido).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Pedido registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/pedidos/gestion']);
        }
      },
      error: (err) => {
        console.error('Error guardando pedido:', err);
        this.snackBar.open('Error al registrar pedido: ' + (err.error?.message || 'Inténtalo de nuevo'), 'Cerrar', { duration: 5000 });
      }
    });
  }
}
