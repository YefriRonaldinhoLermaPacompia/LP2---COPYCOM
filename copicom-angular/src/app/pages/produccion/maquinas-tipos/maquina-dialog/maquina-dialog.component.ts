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
import { Maquina } from 'src/app/models/maquina.model';
import { TipoMaquinaria } from 'src/app/models/tipo-maquinaria.model';

export interface DialogData {
  maquina: Maquina | null;
  mode: 'create' | 'edit';
  tiposMaquinaria: TipoMaquinaria[];
}

@Component({
  selector: 'app-maquina-dialog',
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
  templateUrl: './maquina-dialog.component.html',
  styleUrl: './maquina-dialog.component.scss'
})
export class MaquinaDialogComponent implements OnInit {

  maquinaForm: FormGroup;
  isEditMode: boolean;
  tiposMaquinaria: TipoMaquinaria[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MaquinaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';
    this.tiposMaquinaria = data.tiposMaquinaria || [];

    this.maquinaForm = this.fb.group({
      nombreMaquina: ['', [Validators.required, Validators.maxLength(45)]],
      descripcion: ['', [Validators.maxLength(255)]],
      fechaUltMantenimiento: [''],
      tipoMaquinariaId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.maquina) {
      this.maquinaForm.patchValue({
        nombreMaquina: this.data.maquina.nombreMaquina,
        descripcion: this.data.maquina.descripcion || '',
        fechaUltMantenimiento: this.data.maquina.fechaUltMantenimiento || '',
        tipoMaquinariaId: this.data.maquina.tipoMaquinariaId,
      });
    }
  }

  onSubmit(): void {
    if (this.maquinaForm.valid) {
      const formValue = this.maquinaForm.value;
      const result: Maquina = {
        id: this.data.maquina?.id ?? undefined,
        nombreMaquina: formValue.nombreMaquina,
        descripcion: formValue.descripcion || undefined,
        fechaUltMantenimiento: formValue.fechaUltMantenimiento ? new Date(formValue.fechaUltMantenimiento).toISOString() : undefined,
        tipoMaquinariaId: formValue.tipoMaquinariaId,
      };
      this.dialogRef.close(result);
    } else {
      Object.keys(this.maquinaForm.controls).forEach(key => {
        this.maquinaForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.maquinaForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}

