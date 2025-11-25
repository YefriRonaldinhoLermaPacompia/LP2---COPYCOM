import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PedidoDialogComponent } from '../../pedidos/gestionar-pedidos/pedido-dialog/pedido-dialog.component';

@Component({
  selector: 'app-generar-cotizacion',
  standalone: true,
  imports: [CommonModule, MatCardModule, MaterialModule],
  templateUrl: './generar-cotizacion.component.html',
  styleUrl: './generar-cotizacion.component.scss'
})
export class GenerarCotizacionComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  generarCotizacion() {
    // Abre el diálogo de pedido para generar una cotización
    const dialogRef = this.dialog.open(PedidoDialogComponent, {
      width: '900px',
      maxWidth: '95vw',
      disableClose: true,
      data: { pedido: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // La cotización es básicamente un pedido en estado PENDIENTE
        // Se puede redirigir a la gestión de pedidos
        this.router.navigate(['/pedidos/gestion']);
      }
    });
  }
}
