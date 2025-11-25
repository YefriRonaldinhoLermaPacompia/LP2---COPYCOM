import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TipoGeneracion } from 'src/app/models/tipo-generacion.model';

export interface DialogData {
  tipo: TipoGeneracion | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-generacion-dialog',
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
  templateUrl: './generacion-dialog.component.html',
  styleUrl: './generacion-dialog.component.scss'
})
export class GeneracionDialogComponent implements OnInit {

  tipoForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GeneracionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.tipoForm = this.fb.group({
      nombreTipoGeneracion: ['', [Validators.required, Validators.maxLength(120)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.tipo) {
      this.tipoForm.patchValue(this.data.tipo);
    }
  }

  onSubmit(): void {
    if (this.tipoForm.valid) {

      const result: TipoGeneracion = {
        id: this.data.tipo?.id ?? null,
        ...this.tipoForm.value
      };

      this.dialogRef.close(result);

    } else {
      Object.keys(this.tipoForm.controls).forEach(key => {
        this.tipoForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.tipoForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
