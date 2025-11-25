import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Tamano } from 'src/app/models/tamano.model';

export interface DialogData {
  tamano: Tamano | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-tamano-dialog',
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
  templateUrl: './tamano-dialog.component.html',
  styleUrl: './tamano-dialog.component.scss'
})
export class TamanoDialogComponent implements OnInit {

  tamanoForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TamanoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.tamanoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.tamano) {
      this.tamanoForm.patchValue({
        nombre: this.data.tamano.nombreTamano,
        precio: this.data.tamano.precioTamano,
      });
    }
  }

  onSubmit(): void {
    if (this.tamanoForm.valid) {

      const result = {
        nombreTamano: this.tamanoForm.value.nombre,
        precioTamano: this.tamanoForm.value.precio,
        id: this.data.tamano?.id ?? null
      };

      this.dialogRef.close(result);

    } else {
      Object.keys(this.tamanoForm.controls).forEach(key => {
        this.tamanoForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.tamanoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
