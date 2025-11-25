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
import { MatSnackBar } from '@angular/material/snack-bar';

import { Client } from 'src/app/models/client.model';
import { ClientService } from 'src/app/providers/services/catalog/client.service';
import { ClienteDialogComponent } from './cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-registrar-cliente',
  standalone: true,
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
  templateUrl: './registrar-cliente.component.html',
  styleUrl: './registrar-cliente.component.scss'
})
export class RegistrarClienteComponent implements OnInit {

  displayedColumns: string[] = ['nombres', 'apellidos', 'dni', 'telefono', 'correo', 'acciones'];
  public clientes: Client[] = [];
  isLoading: boolean = false;

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getClientes();
  }

  private getClientes(): void {
    this.isLoading = true;
    this.clientService.getAll$().subscribe({
      next: (response) => {
        this.clientes = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando clientes:', err);
        this.isLoading = false;
      }
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '700px',
      disableClose: true,
      data: { cliente: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.saveCliente(result);
    });
  }

  private saveCliente(cliente: Client): void {
    this.clientService.add$(cliente).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Cliente registrado exitosamente', 'Cerrar', { duration: 3000 });
          this.getClientes();
        }
      },
      error: (err) => {
        console.error('Error guardando cliente:', err);
        this.snackBar.open('Error al registrar cliente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  openEditDialog(cliente: Client) {
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '700px',
      disableClose: true,
      data: { cliente: cliente, mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveEditCliente(cliente.id, result);
      }
    });
  }

  private saveEditCliente(id: number | undefined, cliente: Client) {
    this.clientService.update$(id, cliente).subscribe({
      next: (response) => {
        if (response) {
          this.snackBar.open('Cliente actualizado exitosamente', 'Cerrar', { duration: 3000 });
          this.getClientes();
        }
      },
      error: (err) => {
        console.error('Error actualizando cliente:', err);
        this.snackBar.open('Error al actualizar cliente', 'Cerrar', { duration: 3000 });
      }
    });
  }

  deleteCliente(cliente: Client) {
    if (confirm('¿Está seguro de eliminar este cliente?')) {
      this.clientService.delete$(cliente.id).subscribe({
        next: () => {
          this.clientes = this.clientes.filter(c => c.id !== cliente.id);
          this.snackBar.open('Cliente eliminado exitosamente', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error('Error eliminando cliente:', err);
          this.snackBar.open('Error al eliminar cliente', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
