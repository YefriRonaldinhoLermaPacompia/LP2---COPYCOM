import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { Color } from 'src/app/models/color.model';
import { ColorService } from 'src/app/providers/services/catalog/color.service';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';

@Component({
  selector: 'app-color',
  imports: [
    FormsModule,
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './color.component.html',
  styleUrl: './color.component.scss'
})
export class ColorComponent implements OnInit {

  displayedColumns: string[] = ['nombreColor', 'precioColor', 'acciones'];

  public colores: Color[] = [];
  isLoading: boolean = false;

  constructor(
    private colorService: ColorService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getColores();
  }

  private getColores(): void {
    this.isLoading = true;
    this.colorService.getAll$().subscribe(response => {
      this.colores = response;
      console.log(response);
      this.isLoading = false;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ColorDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { color: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveColor(result);
    });
  }

  private saveColor(color: Color): void {
    this.colorService.add$(color).subscribe(response => {
      if (response) {
        this.getColores();
      }
    });
  }

  openEditDialog(color: Color) {
    const dialogRef = this.dialog.open(ColorDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { color: color, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditColor(color.id, result);
      }
    });
  }

  private saveEditColor(id: number | undefined, color: Color) {
    this.colorService.update$(id, color).subscribe(response => {
      if (response) {
        this.getColores();
      }
    });
  }

  deleteColor(color: Color) {
    this.colorService.delete$(color.id).subscribe({
      next: () => {
        this.colores = this.colores.filter(c => c.id !== color.id);
      },
      error: (err) => {
        console.error('Error eliminando color:', err);
      }
    });
  }
}
