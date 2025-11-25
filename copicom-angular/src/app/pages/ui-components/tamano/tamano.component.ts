import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Tamano } from 'src/app/models/tamano.model';
import { TamanoService } from 'src/app/providers/services/catalog/tamano.service';
import { MatDialog } from '@angular/material/dialog';
import { TamanoDialogComponent } from './tamano-dialog/tamano-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tamano',
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
  templateUrl: './tamano.component.html',
  styleUrl: './tamano.component.scss'
})
export class TamanoComponent implements OnInit {
  // table 1
  displayedColumns: string[] = ['nombre', 'precio', 'acciones'];

  public tamanos: Tamano[] = [];
  isLoading: boolean;

  constructor(private tamanoService: TamanoService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getTamanos();
  }

  private getTamanos(): void {
    this.isLoading = true;
    this.tamanoService.getAll$().subscribe(response => {
      this.tamanos = response;
      console.log(response);
      this.isLoading = false;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(TamanoDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { tamano: null, mode: 'create' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) return; // si cancela → no hacer nada
      this.saveTamano(result);
    });
  }

  private saveTamano(tamano: Tamano): void {
    this.tamanoService.add$(tamano).subscribe(response => {
      if (response) {
        this.getTamanos();
      }
    })
  }

  openEditDialog(tamano: Tamano) {

    const dialogRef = this.dialog.open(TamanoDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { tamano: tamano, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditTamano(tamano.id, result);
      }
    });

  }

  private saveEditTamano(id: number | undefined, tamano: Tamano) {
    this.tamanoService.update$(id, tamano).subscribe(response => {
      if (response) {
        this.getTamanos();
      }
    })
  }

  deleteTamano(tamano: Tamano) {
    this.tamanoService.delete$(tamano.id).subscribe({
      next: () => {
        this.tamanos = this.tamanos.filter(t => t.id !== tamano.id);
      },
      error: (err) => {
        console.error('Error eliminando tamaño:', err);
      }
    });
  }
}
