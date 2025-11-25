import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Pago } from 'src/app/models/pago.model';

export interface DialogData {
  pago: Pago | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-pago-dialog',
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './pago-dialog.component.html',
  styleUrl: './pago-dialog.component.scss'
})
export class PagoDialogComponent implements OnInit {

  pagoForm: FormGroup;
  isEditMode: boolean;
  modosPago: string[] = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'YAPE', 'PLIN', 'OTRO'];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PagoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.pagoForm = this.fb.group({
      modo: ['', [Validators.required]],
      monto: [0, [Validators.required, Validators.min(0.01)]],
      fechaPago: [new Date()],
      ventaId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.pago) {
      this.pagoForm.patchValue({
        modo: this.data.pago.modo || '',
        monto: this.data.pago.monto || 0,
        fechaPago: this.data.pago.fechaPago ? new Date(this.data.pago.fechaPago) : new Date(),
        ventaId: this.data.pago.ventaId || '',
      });
    }
  }

  onSubmit(): void {
    if (this.pagoForm.valid) {
      const formValue = this.pagoForm.value;
      const result: Pago = {
        id: this.data.pago?.id,
        modo: formValue.modo,
        monto: formValue.monto,
        fechaPago: formValue.fechaPago ? new Date(formValue.fechaPago).toISOString() : new Date().toISOString(),
        ventaId: formValue.ventaId,
      };
      this.dialogRef.close(result);
    } else {
      Object.keys(this.pagoForm.controls).forEach(key => {
        this.pagoForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.pagoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}

