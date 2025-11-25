import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Envio } from 'src/app/models/envio.model';

export interface DialogData {
  envio: Envio | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-envio-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './envio-dialog.component.html',
  styleUrl: './envio-dialog.component.scss'
})
export class EnvioDialogComponent implements OnInit {

  envioForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EnvioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.envioForm = this.fb.group({
      codigoRastreo: ['', [Validators.maxLength(50)]],
      numeroRastreo: ['', [Validators.maxLength(50)]],
      departamento: ['', [Validators.maxLength(50)]],
      provincia: ['', [Validators.maxLength(50)]],
      distrito: ['', [Validators.maxLength(50)]],
      direccionEnvio: ['', [Validators.maxLength(255)]],
      referencia: ['', [Validators.maxLength(255)]],
      fechaEnvio: [''],
      fechaEntrega: [''],
      costoEnvio: [0, [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.envio) {
      this.envioForm.patchValue({
        codigoRastreo: this.data.envio.codigoRastreo || '',
        numeroRastreo: this.data.envio.numeroRastreo || '',
        departamento: this.data.envio.departamento || '',
        provincia: this.data.envio.provincia || '',
        distrito: this.data.envio.distrito || '',
        direccionEnvio: this.data.envio.direccionEnvio || '',
        referencia: this.data.envio.referencia || '',
        fechaEnvio: this.data.envio.fechaEnvio || '',
        fechaEntrega: this.data.envio.fechaEntrega || '',
        costoEnvio: this.data.envio.costoEnvio || 0,
      });
    }
  }

  onSubmit(): void {
    if (this.envioForm.valid) {
      const formValue = this.envioForm.value;
      const result: Envio = {
        id: this.data.envio?.id ?? undefined,
        codigoRastreo: formValue.codigoRastreo || undefined,
        numeroRastreo: formValue.numeroRastreo || undefined,
        departamento: formValue.departamento || undefined,
        provincia: formValue.provincia || undefined,
        distrito: formValue.distrito || undefined,
        direccionEnvio: formValue.direccionEnvio || undefined,
        referencia: formValue.referencia || undefined,
        fechaEnvio: formValue.fechaEnvio ? new Date(formValue.fechaEnvio).toISOString() : undefined,
        fechaEntrega: formValue.fechaEntrega ? new Date(formValue.fechaEntrega).toISOString() : undefined,
        costoEnvio: formValue.costoEnvio || undefined,
      };
      this.dialogRef.close(result);
    } else {
      Object.keys(this.envioForm.controls).forEach(key => {
        this.envioForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.envioForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}

