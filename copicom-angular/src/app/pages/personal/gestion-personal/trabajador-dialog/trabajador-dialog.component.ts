import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Trabajador } from 'src/app/models/trabajador.model';

export interface DialogData {
  trabajador: Trabajador | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-trabajador-dialog',
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
  templateUrl: './trabajador-dialog.component.html',
  styleUrl: './trabajador-dialog.component.scss'
})
export class TrabajadorDialogComponent implements OnInit {

  trabajadorForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrabajadorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.trabajadorForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      dni: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      celular: ['', [Validators.maxLength(45)]],
      correo: ['', [Validators.email, Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.trabajador) {
      this.trabajadorForm.patchValue({
        nombres: this.data.trabajador.nombres || '',
        dni: this.data.trabajador.dni || '',
        celular: this.data.trabajador.celular || '',
        correo: this.data.trabajador.correo || '',
      });
    }
  }

  onSubmit(): void {
    if (this.trabajadorForm.valid) {
      const result: Trabajador = {
        id: this.data.trabajador?.id,
        nombres: this.trabajadorForm.value.nombres,
        dni: this.trabajadorForm.value.dni,
        celular: this.trabajadorForm.value.celular || undefined,
        correo: this.trabajadorForm.value.correo || undefined,
      };
      this.dialogRef.close(result);
    } else {
      Object.keys(this.trabajadorForm.controls).forEach(key => {
        this.trabajadorForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.trabajadorForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
