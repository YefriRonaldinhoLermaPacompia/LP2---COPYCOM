import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Client } from 'src/app/models/client.model';

export interface DialogData {
  cliente: Client | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-cliente-dialog',
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
  templateUrl: './cliente-dialog.component.html',
  styleUrl: './cliente-dialog.component.scss'
})
export class ClienteDialogComponent implements OnInit {

  clienteForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.clienteForm = this.fb.group({
      nombres: ['', [Validators.required, Validators.maxLength(100)]],
      apellidos: ['', [Validators.required, Validators.maxLength(100)]],
      dni: ['', [Validators.maxLength(45)]],
      direccion: ['', [Validators.maxLength(255)]],
      telefono: ['', [Validators.maxLength(45)]],
      ruc: ['', [Validators.maxLength(45)]],
      correo: ['', [Validators.email, Validators.maxLength(145)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.cliente) {
      this.clienteForm.patchValue({
        nombres: this.data.cliente.nombres || '',
        apellidos: this.data.cliente.apellidos || '',
        dni: this.data.cliente.dni || '',
        direccion: this.data.cliente.direccion || '',
        telefono: this.data.cliente.telefono || '',
        ruc: this.data.cliente.ruc || '',
        correo: this.data.cliente.correo || '',
      });
    }
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const result: Client = {
        id: this.data.cliente?.id ?? undefined,
        nombres: this.clienteForm.value.nombres,
        apellidos: this.clienteForm.value.apellidos,
        dni: this.clienteForm.value.dni || undefined,
        direccion: this.clienteForm.value.direccion || undefined,
        telefono: this.clienteForm.value.telefono || undefined,
        ruc: this.clienteForm.value.ruc || undefined,
        correo: this.clienteForm.value.correo || undefined,
      };
      this.dialogRef.close(result);
    } else {
      Object.keys(this.clienteForm.controls).forEach(key => {
        this.clienteForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.clienteForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}

