import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Pedido } from 'src/app/models/pedido.model';
import { Client } from 'src/app/models/client.model';
import { PedidoService } from 'src/app/providers/services/catalog/pedido.service';
import { ClientService } from 'src/app/providers/services/catalog/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta-estado',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTableModule,
    MatChipsModule,
  ],
  templateUrl: './consulta-estado.component.html',
  styleUrl: './consulta-estado.component.scss'
})
export class ConsultaEstadoComponent implements OnInit {

  consultaForm: FormGroup;
  public pedidos: Pedido[] = [];
  public cliente: Client | null = null;
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'fechaPedido', 'totalPedido', 'estado', 'acciones'];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private clientService: ClientService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.consultaForm = this.fb.group({
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    });
  }

  ngOnInit(): void {
  }

  buscarPedidos() {
    if (this.consultaForm.invalid) {
      this.consultaForm.markAllAsTouched();
      return;
    }

    const dni = this.consultaForm.value.dni;
    this.isLoading = true;
    this.pedidos = [];
    this.cliente = null;

    // Primero buscar el cliente por DNI
    this.clientService.getAll$().subscribe({
      next: (clientes) => {
        const clienteEncontrado = clientes.find(c => c.dni === dni);
        if (!clienteEncontrado) {
          this.snackBar.open('No se encontró un cliente con ese DNI', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
          return;
        }

        this.cliente = clienteEncontrado;

        // Buscar pedidos del cliente
        if (clienteEncontrado.id) {
          this.pedidoService.obtenerPorCliente$(clienteEncontrado.id).subscribe({
            next: (pedidos) => {
              this.pedidos = pedidos;
              this.isLoading = false;
              if (pedidos.length === 0) {
                this.snackBar.open('El cliente no tiene pedidos registrados', 'Cerrar', { duration: 3000 });
              }
            },
            error: (err) => {
              console.error('Error buscando pedidos:', err);
              this.isLoading = false;
              this.snackBar.open('Error al buscar pedidos', 'Cerrar', { duration: 3000 });
            }
          });
        }
      },
      error: (err) => {
        console.error('Error buscando cliente:', err);
        this.isLoading = false;
        this.snackBar.open('Error al buscar cliente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  getEstadoColor(estado?: string): string {
    switch (estado) {
      case 'ENTREGADO': return 'primary';
      case 'EN_PRODUCCION': return 'accent';
      case 'CANCELADO': return 'warn';
      default: return '';
    }
  }

  verDetalle(pedido: Pedido) {
    // Puedes abrir un diálogo o navegar a una página de detalle
    alert(`Pedido ${pedido.serie && pedido.numeroPedido ? pedido.serie + '-' + pedido.numeroPedido : '#' + pedido.id}\nEstado: ${pedido.estado}\nTotal: S/ ${pedido.totalPedido}`);
  }

  rastrearPedido(pedido: Pedido) {
    if (pedido.serie && pedido.numeroPedido) {
      this.router.navigate(['/pedidos/rastrear'], {
        queryParams: { serie: pedido.serie, numero: pedido.numeroPedido }
      });
    } else {
      this.snackBar.open('Este pedido no tiene serie y número asignados', 'Cerrar', { duration: 3000 });
    }
  }
}
