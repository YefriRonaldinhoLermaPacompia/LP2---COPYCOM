import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from 'src/app/material.module';
import { ServicioService } from 'src/app/providers/services/catalog/servicio.service';
import { Servicio } from 'src/app/models/servicio.model';

@Component({
  selector: 'app-catalogo-servicios',
  standalone: true,
  imports: [CommonModule, MatCardModule, MaterialModule],
  templateUrl: './catalogo-servicios.component.html',
  styleUrl: './catalogo-servicios.component.scss'
})
export class CatalogoServiciosComponent implements OnInit {

  public servicios: Servicio[] = [];
  isLoading: boolean = false;

  constructor(
    private servicioService: ServicioService
  ) { }

  ngOnInit(): void {
    this.getServicios();
  }

  private getServicios(): void {
    this.isLoading = true;
    this.servicioService.getAll$().subscribe({
      next: (response) => {
        this.servicios = Array.isArray(response) ? response : [response];
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando servicios:', err);
        this.isLoading = false;
      }
    });
  }
}
