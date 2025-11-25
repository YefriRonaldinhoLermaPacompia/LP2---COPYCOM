import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Acabado } from 'src/app/models/acabado.model';

export interface DialogData {
  acabado: Acabado | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-acabado-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './acabado-dialog.component.html',
  styleUrl: './acabado-dialog.component.scss'
})
export class AcabadoDialogComponent implements OnInit {

  acabadoForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AcabadoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.acabadoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.acabado) {
      this.acabadoForm.patchValue({
        nombre: this.data.acabado.nombreAcabado,
        precio: this.data.acabado.precioAcabado,
      });
    }
  }

  onSubmit(): void {
    if (this.acabadoForm.valid) {

      const result: Acabado = {
        id: this.data.acabado?.id ?? undefined,
        nombreAcabado: this.acabadoForm.value.nombre,
        precioAcabado: this.acabadoForm.value.precio,
      };

      this.dialogRef.close(result);

    } else {
      Object.keys(this.acabadoForm.controls).forEach(key => {
        this.acabadoForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.acabadoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
