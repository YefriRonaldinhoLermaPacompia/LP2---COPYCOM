import { Routes } from '@angular/router';

export const ServiciosRoutes: Routes = [
  {
    path: 'catalogo',
    loadComponent: () => import('./catalogo-servicios/catalogo-servicios.component').then(m => m.CatalogoServiciosComponent),
  },
  {
    path: 'cotizacion',
    loadComponent: () => import('./generar-cotizacion/generar-cotizacion.component').then(m => m.GenerarCotizacionComponent),
  },
];

