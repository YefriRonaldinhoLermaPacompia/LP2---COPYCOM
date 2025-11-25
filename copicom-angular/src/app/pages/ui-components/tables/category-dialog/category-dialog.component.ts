import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Category} from "../../../../models/categoria.model";


export interface DialogData {
  categoria: Category | null;
  mode: 'create' | 'edit';
}

@Component({
  selector: 'app-category-dialog',
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
  templateUrl: './category-dialog.component.html',
  styles: [`
    .category-form {
      mat-form-field {
        margin-bottom: 16px;
      }
    }
  `]
})
export class CategoryDialogComponent implements OnInit {

  categoryForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.isEditMode = data.mode === 'edit';

    this.categoryForm = this.fb.group({
      codigo: [
        {value: '', disabled: this.isEditMode},
        [Validators.required, Validators.maxLength(10)]
      ],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.categoria) {
      this.categoryForm.patchValue({
        codigo: this.data.categoria.codigo,
        nombre: this.data.categoria.nombre,
        descripcion: this.data.categoria.descripcion,
      });
    }
  }

  onSubmit(): void {
    if (this.categoryForm.valid) {
      const formValue = this.categoryForm.getRawValue(); // Para obtener campos disabled
      this.dialogRef.close(formValue);
    } else {
      Object.keys(this.categoryForm.controls).forEach(key => {
        this.categoryForm.get(key)?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  hasError(field: string, error: string): boolean {
    const control = this.categoryForm.get(field);
    return !!(control && control.hasError(error) && control.touched);
  }

  getCharCount(field: string): number {
    return this.categoryForm.get(field)?.value?.length || 0;
  }
}
