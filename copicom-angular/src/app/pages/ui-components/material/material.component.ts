import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Material } from 'src/app/models/material.model';
import { MaterialService } from 'src/app/providers/services/catalog/material.service';

import { MaterialDialogComponent } from './material-dialog/material-dialog.component';

@Component({
  selector: 'app-material',
  imports: [
    FormsModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './material.component.html',
  styleUrl: './material.component.scss'
})
export class MaterialComponent implements OnInit {

  displayedColumns: string[] = ['nombreMaterial', 'precioMaterialUnitario', 'cantidadServicioPedido', 'acciones'];

  public materiales: Material[] = [];
  isLoading: boolean;

  constructor(
    private materialService: MaterialService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMateriales();
  }

  private getMateriales(): void {
    this.isLoading = true;

    this.materialService.getAll$().subscribe(response => {
      this.materiales = response;
      this.isLoading = false;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { material: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveMaterial(result);
    });
  }

  private saveMaterial(material: Material): void {
    this.materialService.add$(material).subscribe(response => {
      if (response) {
        this.getMateriales();
      }
    });
  }

  openEditDialog(material: Material) {
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { material: material, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditMaterial(material.id, result);
      }
    });
  }

  private saveEditMaterial(id: number | undefined, material: Material) {
    this.materialService.update$(id, material).subscribe(response => {
      if (response) {
        this.getMateriales();
      }
    });
  }

  deleteMaterial(material: Material) {
    this.materialService.delete$(material.id).subscribe({
      next: () => {
        this.materiales = this.materiales.filter(m => m.id !== material.id);
      },
      error: (err) => {
        console.error('Error eliminando material:', err);
      }
    });
  }
}
