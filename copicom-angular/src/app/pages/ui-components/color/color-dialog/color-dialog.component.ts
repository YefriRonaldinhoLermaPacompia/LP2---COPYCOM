import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Color } from 'src/app/models/color.model';

export interface DialogData {
  color: Color | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-color-dialog',
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
  templateUrl: './color-dialog.component.html',
  styleUrl: './color-dialog.component.scss'
})
export class ColorDialogComponent implements OnInit {

  colorForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ColorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.colorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      precio: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.color) {
      this.colorForm.patchValue({
        nombre: this.data.color.nombreColor,
        precio: this.data.color.precioColor,
      });
    }
  }

  onSubmit(): void {
    if (this.colorForm.valid) {

      const result: Color = {
        id: this.data.color?.id ?? undefined,
        nombreColor: this.colorForm.value.nombre,
        precioColor: this.colorForm.value.precio,
      };

      this.dialogRef.close(result);

    } else {
      Object.keys(this.colorForm.controls).forEach(key => {
        this.colorForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.colorForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
