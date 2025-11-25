import { Component, Inject, OnInit } from '@angular/core';
import { Sale } from "../../../../models/sale.model";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatInput, MatLabel } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from "@angular/material/button";
import { ClientService } from "../../../../providers/services/catalog/client.service";
import { Client } from "../../../../models/client.model";
import { MatSelectModule } from '@angular/material/select';
import { AsyncPipe, NgForOf } from "@angular/common";
import { ServicioService } from "../../../../providers/services/catalog/servicio.service";
import { Servicio } from "../../../../models/servicio.model";
import { distinctUntilChanged, Observable, switchMap } from 'rxjs';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatOptionModule } from '@angular/material/core';
import { filter } from "rxjs/operators";
import { MatTableModule, MatTableDataSource } from "@angular/material/table";
import { PaymentForm } from "../../../../models/forms/payment-form";
import { SaleServicioModel } from 'src/app/models/forms/sale-servicio.model';

export interface DialogData {
  sale: Sale | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-sale-dialog',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInput,
    MatLabel,
    MatButton,
    MatSelectModule,
    NgForOf,
    MatAutocompleteModule,
    MatOptionModule,
    AsyncPipe,
    MatTableModule
  ],
  templateUrl: './sale-dialog.component.html',
  styleUrls: ['./sale-dialog.component.scss']
})
export class SaleDialogComponent implements OnInit {

  saleForm: FormGroup;
  public clients: Client[] = [];

  /** 🔹 DataSource para la tabla de servicios */
  public saleServices = new MatTableDataSource<Servicio>([]);
  public SaleServicioModels: SaleServicioModel[] = [];
  serviciosFiltrados!: Observable<Servicio[]>;

  public paymentForms: PaymentForm[] = [];
  public subTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private servicioService: ServicioService,
    public dialogRef: MatDialogRef<SaleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.saleForm = this.fb.group({
      total: ['', Validators.required],
      subtotal: ['', Validators.required],
      observaciones: [''],
      serie: [''],
      detalles: [[]],
      clienteId: [''],
      nombreServicio: [''],
      pagos: [[]],
      estado: ['COMPLETADA']
    });
  }

  ngOnInit(): void {
    this.getClients();

    this.serviciosFiltrados = this.saleForm.get('nombreServicio')!.valueChanges.pipe(
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

  /** ❌ Cancelar: nunca envía nada */
  onCancel(event?: Event) {
    if (event) event.preventDefault();
    this.dialogRef.close(null);
  }

  /** ✔ Guardar: devuelve datos solo al dar click */
  onSubmit() {
    this.subTotal = 0;
    this.SaleServicioModels = [];

    this.saleServices.data.forEach(servicio => {
      const detalle = new SaleServicioModel();
      detalle.cantidad = servicio.cantidad!;
      detalle.precioUnitario = servicio.precioUnitario!;
      detalle.subtotal = servicio.cantidad! * servicio.precioUnitario!;
      detalle.servicioId = servicio.id!;

      this.subTotal += detalle.subtotal;
      this.SaleServicioModels.push(detalle);
    });

    const value = this.saleForm.value;
    value.total = this.subTotal;
    value.subtotal = this.subTotal;
    value.detalles = this.SaleServicioModels;
    value.pagos = this.paymentForms;

    this.dialogRef.close(value);
  }

  /** Agregar servicio desde autocomplete */
  selectServicio(servicio: Servicio) {
    servicio.cantidad = 1;

    const data = this.saleServices.data;
    data.push(servicio);
    this.saleServices.data = [...data]; // 🔹 actualizar referencia
    this.recalculateTotals();
  }

  /** Agregar forma de pago */
  addPayment() {
    const payment = new PaymentForm();
    payment.modo = 'Efectivo';
    payment.monto = '0.00';
    this.paymentForms.push(payment);
  }

  /** Cambiar cantidad y recalcular */
  changeCantidad(servicio: Servicio, index: number) {
    this.recalculateTotals();
    this.saleServices.data = [...this.saleServices.data]; // refrescar tabla
  }

  private recalculateTotals() {
    this.subTotal = 0;
    this.saleServices.data.forEach(s => {
      if (!s.cantidad) s.cantidad = 1;
      const subtotal = s.precioUnitario! * s.cantidad;
      this.subTotal += subtotal;
    });
  }

}
