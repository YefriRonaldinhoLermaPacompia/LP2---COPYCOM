import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface Usuario {
  id?: number;
  username?: string;
  email?: string;
  nombre?: string;
  apellido?: string;
  activo?: boolean;
  roles?: string[];
}

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatTableModule,
  ],
  templateUrl: './gestion-usuarios.component.html',
  styleUrl: './gestion-usuarios.component.scss'
})
export class GestionUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['username', 'email', 'nombre', 'apellido', 'activo', 'roles'];
  public usuarios: Usuario[] = [];
  isLoading: boolean = false;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    // Nota: Este endpoint necesita ser creado en el backend
    // Por ahora mostramos un mensaje
    this.snackBar.open('La gestión de usuarios requiere un endpoint específico en el backend', 'Cerrar', { duration: 5000 });
  }
}
