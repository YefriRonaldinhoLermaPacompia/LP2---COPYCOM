import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { ActivatedRoute } from '@angular/router';

import { Pedido } from 'src/app/models/pedido.model';
import { PedidoService } from 'src/app/providers/services/catalog/pedido.service';

interface EstadoTimeline {
  estado: string;
  fecha?: string;
  activo: boolean;
  completado: boolean;
  descripcion: string;
}

@Component({
  selector: 'app-rastrear-pedido',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatStepperModule,
    MatDividerModule,
  ],
  templateUrl: './rastrear-pedido.component.html',
  styleUrl: './rastrear-pedido.component.scss'
})
export class RastrearPedidoComponent implements OnInit {

  rastreoForm: FormGroup;
  public pedido: Pedido | null = null;
  isLoading: boolean = false;
  timelineEstados: EstadoTimeline[] = [];

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.rastreoForm = this.fb.group({
      serie: ['PED', [Validators.required, Validators.maxLength(20)]],
      numero: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
    // Verificar si hay parámetros en la URL
    this.route.queryParams.subscribe(params => {
      if (params['serie'] && params['numero']) {
        this.rastreoForm.patchValue({
          serie: params['serie'],
          numero: params['numero']
        });
        // Buscar automáticamente si hay parámetros
        this.buscarPedido();
      }
    });
  }

  buscarPedido() {
    if (this.rastreoForm.invalid) {
      this.rastreoForm.markAllAsTouched();
      return;
    }

    const { serie, numero } = this.rastreoForm.value;
    this.isLoading = true;
    this.pedido = null;
    this.timelineEstados = [];

    this.pedidoService.rastrearPedido$(serie, numero).subscribe({
      next: (pedido) => {
        this.pedido = pedido;
        this.construirTimeline(pedido);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error rastreando pedido:', err);
        this.isLoading = false;
        const mensaje = err.error?.message || err.message || 'No se encontró el pedido con los datos proporcionados';
        this.snackBar.open(mensaje, 'Cerrar', { duration: 5000 });
      }
    });
  }

  construirTimeline(pedido: Pedido) {
    const estadoActual = pedido.estado || 'PENDIENTE';
    const estados: EstadoTimeline[] = [
      {
        estado: 'PENDIENTE',
        fecha: pedido.fechaPedido,
        activo: estadoActual === 'PENDIENTE',
        completado: this.estadoCompletado('PENDIENTE', estadoActual),
        descripcion: 'Pedido registrado y pendiente de procesamiento'
      },
      {
        estado: 'EN_PRODUCCION',
        activo: estadoActual === 'EN_PRODUCCION',
        completado: this.estadoCompletado('EN_PRODUCCION', estadoActual),
        descripcion: 'Pedido en proceso de producción'
      },
      {
        estado: 'ENTREGADO',
        activo: estadoActual === 'ENTREGADO',
        completado: this.estadoCompletado('ENTREGADO', estadoActual),
        descripcion: 'Pedido entregado al cliente'
      },
      {
        estado: 'CANCELADO',
        activo: estadoActual === 'CANCELADO',
        completado: estadoActual === 'CANCELADO',
        descripcion: 'Pedido cancelado'
      }
    ];

    this.timelineEstados = estados;
  }

  estadoCompletado(estadoActual: string, estadoPedido: string): boolean {
    const ordenEstados = ['PENDIENTE', 'EN_PRODUCCION', 'ENTREGADO'];
    const indiceActual = ordenEstados.indexOf(estadoActual);
    const indicePedido = ordenEstados.indexOf(estadoPedido);
    return indiceActual < indicePedido || estadoPedido === 'CANCELADO';
  }

  getEstadoColor(estado?: string): string {
    switch (estado) {
      case 'ENTREGADO': return 'primary';
      case 'EN_PRODUCCION': return 'accent';
      case 'CANCELADO': return 'warn';
      case 'PENDIENTE': return '';
      default: return '';
    }
  }

  getEstadoIcon(estado?: string): string {
    switch (estado) {
      case 'ENTREGADO': return 'check_circle';
      case 'EN_PRODUCCION': return 'build';
      case 'CANCELADO': return 'cancel';
      case 'PENDIENTE': return 'schedule';
      default: return 'help';
    }
  }

  getTimelineIcon(estado: EstadoTimeline): string {
    if (estado.completado && estado.estado !== 'CANCELADO') {
      return 'check_circle';
    }
    if (estado.activo) {
      return 'radio_button_checked';
    }
    return 'radio_button_unchecked';
  }

  getTimelineColor(estado: EstadoTimeline): string {
    if (estado.completado && estado.estado !== 'CANCELADO') {
      return 'primary';
    }
    if (estado.activo) {
      return 'accent';
    }
    if (estado.estado === 'CANCELADO' && estado.activo) {
      return 'warn';
    }
    return '';
  }
}

