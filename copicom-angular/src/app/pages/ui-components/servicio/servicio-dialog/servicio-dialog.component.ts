import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/providers/services/catalog/servicio.service';

export interface DialogData {
  servicio: Servicio | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-servicio-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './servicio-dialog.component.html',
  styleUrl: './servicio-dialog.component.scss',
})
export class ServicioDialogComponent implements OnInit {

  servicioForm: FormGroup;
  isEditMode: boolean;

  // Listas para selects
  tamanos: any[] = [];
  colores: any[] = [];
  materiales: any[] = [];
  acabados: any[] = [];
  tipoGeneraciones: any[] = [];

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    public dialogRef: MatDialogRef<ServicioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {

    this.isEditMode = data.mode === 'edit';

    this.servicioForm = this.fb.group({
      id: [{ value: null, disabled: true }],
      nombreServicio: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: [''],
      precioUnitario: ['', [Validators.required, Validators.min(0)]],
      cantidad: ['', [Validators.required, Validators.min(0)]],
      tamanoId: ['', Validators.required],
      colorId: ['', Validators.required],
      materialId: ['', Validators.required],
      acabadoId: ['', Validators.required],
      tipoGeneracionId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarListasSelect();

    if (this.isEditMode && this.data.servicio) {
      this.servicioForm.patchValue(this.data.servicio);
    }
  }

  /** Cargar todos los selects desde el backend */
  cargarListasSelect(): void {
    this.servicioService.getTamanos().subscribe(data => this.tamanos = data);
    this.servicioService.getColores().subscribe(data => this.colores = data);
    this.servicioService.getMateriales().subscribe(data => this.materiales = data);
    this.servicioService.getAcabados().subscribe(data => this.acabados = data);
    this.servicioService.getTipoGeneraciones().subscribe(data => this.tipoGeneraciones = data);
  }

  /** Guardar o actualizar */
  onSubmit(): void {
    if (this.servicioForm.valid) {

      const formValue = this.servicioForm.getRawValue();

      const result: Servicio = {
        id: this.isEditMode ? this.data.servicio?.id ?? null : undefined,
        ...formValue
      };

      this.dialogRef.close(result);

    } else {
      Object.keys(this.servicioForm.controls).forEach(key => {
        this.servicioForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.servicioForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
