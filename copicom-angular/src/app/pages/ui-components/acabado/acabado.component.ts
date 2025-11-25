import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MaterialModule } from 'src/app/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Acabado } from 'src/app/models/acabado.model';
import { AcabadoService } from 'src/app/providers/services/catalog/acabado.service';
import { MatDialog } from '@angular/material/dialog';
import { AcabadoDialogComponent } from './acabado-dialog/acabado-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acabado',
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
  templateUrl: './acabado.component.html',
  styleUrl: './acabado.component.scss'
})
export class AcabadoComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'precio', 'acciones'];

  public acabados: Acabado[] = [];
  isLoading: boolean = false;

  constructor(
    private acabadoService: AcabadoService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getAcabados();
  }

  private getAcabados(): void {
    this.isLoading = true;
    this.acabadoService.getAll$().subscribe(response => {
      this.acabados = response;
      console.log(response);
      this.isLoading = false;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(AcabadoDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { acabado: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveAcabado(result);
    });
  }

  private saveAcabado(acabado: Acabado): void {
    this.acabadoService.add$(acabado).subscribe(response => {
      if (response) {
        this.getAcabados();
      }
    });
  }

  openEditDialog(acabado: Acabado) {
    const dialogRef = this.dialog.open(AcabadoDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { acabado: acabado, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditAcabado(acabado.id, result);
      }
    });
  }

  private saveEditAcabado(id: number | undefined, acabado: Acabado) {
    this.acabadoService.update$(id, acabado).subscribe(response => {
      if (response) {
        this.getAcabados();
      }
    });
  }

  deleteAcabado(acabado: Acabado) {
    this.acabadoService.delete$(acabado.id).subscribe({
      next: () => {
        this.acabados = this.acabados.filter(a => a.id !== acabado.id);
      },
      error: err => console.error(err)
    });
  }
}
