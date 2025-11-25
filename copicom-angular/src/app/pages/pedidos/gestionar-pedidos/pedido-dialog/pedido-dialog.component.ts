import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { AsyncPipe } from '@angular/common';
import { distinctUntilChanged, Observable, switchMap, filter } from 'rxjs';

import { Pedido, DetallePedido } from 'src/app/models/pedido.model';
import { Client } from 'src/app/models/client.model';
import { Servicio } from 'src/app/models/servicio.model';
import { Trabajador } from 'src/app/models/trabajador.model';
import { Maquina } from 'src/app/models/maquina.model';
import { ClientService } from 'src/app/providers/services/catalog/client.service';
import { ServicioService } from 'src/app/providers/services/catalog/servicio.service';
import { TrabajadorService } from 'src/app/providers/services/catalog/trabajador.service';
import { MaquinaService } from 'src/app/providers/services/catalog/maquina.service';

export interface DialogData {
  pedido: Pedido | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-pedido-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatTableModule,
    AsyncPipe,
  ],
  templateUrl: './pedido-dialog.component.html',
  styleUrl: './pedido-dialog.component.scss'
})
export class PedidoDialogComponent implements OnInit {

  pedidoForm: FormGroup;
  public clients: Client[] = [];
  public trabajadores: Trabajador[] = [];
  public maquinas: Maquina[] = [];
  
  public detalles = new MatTableDataSource<DetallePedido>([]);
  serviciosFiltrados!: Observable<Servicio[]>;
  
  public subTotal: number = 0;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private servicioService: ServicioService,
    private trabajadorService: TrabajadorService,
    private maquinaService: MaquinaService,
    public dialogRef: MatDialogRef<PedidoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.pedidoForm = this.fb.group({
      clienteId: ['', Validators.required],
      observaciones: [''],
      estado: ['PENDIENTE'],
      serie: ['PED', [Validators.maxLength(20)]],
      numeroPedido: ['', [Validators.maxLength(20)]],
      nombreServicio: [''],
    });
  }

  ngOnInit(): void {
    this.getClients();
    this.getTrabajadores();
    this.getMaquinas();

    // Si es modo edición, cargar datos del pedido
    if (this.isEditMode && this.data.pedido) {
      this.pedidoForm.patchValue({
        clienteId: this.data.pedido.clienteId,
        observaciones: this.data.pedido.observaciones || '',
        estado: this.data.pedido.estado || 'PENDIENTE',
        serie: this.data.pedido.serie || 'PED',
        numeroPedido: this.data.pedido.numeroPedido || '',
      });

      // Cargar detalles si existen
      if (this.data.pedido.detalles && this.data.pedido.detalles.length > 0) {
        this.detalles.data = [...this.data.pedido.detalles];
        this.recalculateTotals();
      }
    }

    this.serviciosFiltrados = this.pedidoForm.get('nombreServicio')!.valueChanges.pipe(
      distinctUntilChanged(),
      filter(v => v && v.trim().length > 0),
      switchMap(valor => this.servicioService.buscarPorNombre(valor))
    );
  }

  private getClients(): void {
    this.clientService.getAll$().subscribe(response => {
      this.clients = response;
    });
  }

  private getTrabajadores(): void {
    this.trabajadorService.getAll$().subscribe(response => {
      this.trabajadores = response;
    });
  }

  private getMaquinas(): void {
    this.maquinaService.getAll$().subscribe(response => {
      this.maquinas = response;
    });
  }

  selectServicio(servicio: Servicio) {
    // Crear detalle con servicio seleccionado
    const detalle: DetallePedido = {
      servicioId: servicio.id,
      servicioNombre: servicio.nombreServicio,
      cantidad: 1,
      precioUnitario: servicio.precioUnitario || 0,
      trabajadorId: undefined,
      maquinaId: undefined,
    };
    detalle.subtotal = (detalle.cantidad || 0) * (detalle.precioUnitario || 0);

    const data = this.detalles.data;
    data.push(detalle);
    this.detalles.data = [...data];
    this.recalculateTotals();
    
    // Limpiar autocomplete
    this.pedidoForm.patchValue({ nombreServicio: '' });
  }

  removeDetalle(index: number) {
    const data = this.detalles.data;
    data.splice(index, 1);
    this.detalles.data = [...data];
    this.recalculateTotals();
  }

  updateDetalle(detalle: DetallePedido, field: string, value: any) {
    if (field === 'cantidad') {
      detalle.cantidad = parseInt(value) || 1;
    }
    if (field === 'trabajadorId') {
      detalle.trabajadorId = value;
      const trabajador = this.trabajadores.find(t => t.id === value);
      detalle.trabajadorNombre = trabajador?.nombres;
    }
    if (field === 'maquinaId') {
      detalle.maquinaId = value;
      const maquina = this.maquinas.find(m => m.id === value);
      detalle.maquinaNombre = maquina?.nombreMaquina;
    }
    detalle.subtotal = (detalle.cantidad || 0) * (detalle.precioUnitario || 0);
    this.recalculateTotals();
    this.detalles.data = [...this.detalles.data];
  }

  private recalculateTotals() {
    this.subTotal = 0;
    this.detalles.data.forEach(d => {
      this.subTotal += d.subtotal || 0;
    });
  }

  onSubmit(): void {
    if (this.pedidoForm.invalid || this.detalles.data.length === 0) {
      if (this.detalles.data.length === 0) {
        alert('Debe agregar al menos un servicio al pedido');
      }
      return;
    }

    // Validar que todos los detalles tengan trabajador y máquina
    for (let detalle of this.detalles.data) {
      if (!detalle.trabajadorId || !detalle.maquinaId) {
        alert('Todos los servicios deben tener asignado un trabajador y una máquina');
        return;
      }
    }

    const formValue = this.pedidoForm.value;
    const result: Pedido = {
      id: this.data.pedido?.id,
      clienteId: formValue.clienteId,
      observaciones: formValue.observaciones,
      estado: formValue.estado,
      serie: formValue.serie || 'PED',
      numeroPedido: formValue.numeroPedido || '',
      totalPedido: this.subTotal,
      fechaPedido: this.data.pedido?.fechaPedido || new Date().toISOString(),
      detalles: this.detalles.data,
    };

    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

