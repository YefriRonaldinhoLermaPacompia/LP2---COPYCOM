import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Material } from 'src/app/models/material.model';

export interface DialogData {
  material: Material | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-material-dialog',
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
  templateUrl: './material-dialog.component.html',
  styleUrl: './material-dialog.component.scss'
})
export class MaterialDialogComponent implements OnInit {

  materialForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.materialForm = this.fb.group({
      nombreMaterial: ['', [Validators.required, Validators.maxLength(100)]],
      precioMaterialUnitario: ['', [Validators.required, Validators.min(0)]],
      cantidadServicioPedido: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.material) {
      this.materialForm.patchValue(this.data.material);
    }
  }

  onSubmit(): void {
    if (this.materialForm.valid) {

      const result: Material = {
        id: this.data.material?.id ?? null,
        ...this.materialForm.value
      };

      this.dialogRef.close(result);

    } else {
      Object.keys(this.materialForm.controls).forEach(key => {
        this.materialForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.materialForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }
}
