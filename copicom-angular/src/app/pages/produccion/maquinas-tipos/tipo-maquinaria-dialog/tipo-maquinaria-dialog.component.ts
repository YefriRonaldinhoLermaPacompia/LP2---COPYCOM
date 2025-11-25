import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TipoMaquinaria } from 'src/app/models/tipo-maquinaria.model';

export interface DialogData {
  tipoMaquinaria: TipoMaquinaria | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-tipo-maquinaria-dialog',
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
  templateUrl: './tipo-maquinaria-dialog.component.html',
  styleUrl: './tipo-maquinaria-dialog.component.scss'
})
export class TipoMaquinariaDialogComponent implements OnInit {

  tipoForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TipoMaquinariaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.tipoForm = this.fb.group({
      nombreTipoMaquinaria: ['', [Validators.required, Validators.maxLength(45)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.tipoMaquinaria) {
      this.tipoForm.patchValue({
        nombreTipoMaquinaria: this.data.tipoMaquinaria.nombreTipoMaquinaria,
      });
    }
  }

  onSubmit(): void {
    if (this.tipoForm.valid) {
      const result: TipoMaquinaria = {
        id: this.data.tipoMaquinaria?.id ?? undefined,
        nombreTipoMaquinaria: this.tipoForm.value.nombreTipoMaquinaria,
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

