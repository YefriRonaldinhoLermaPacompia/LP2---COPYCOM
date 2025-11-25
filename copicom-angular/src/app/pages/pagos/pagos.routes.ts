import { Routes } from '@angular/router';

export const PagosRoutes: Routes = [
  {
    path: 'gestion',
    loadComponent: () => import('./gestion-pagos/gestion-pagos.component').then(m => m.GestionPagosComponent),
  },
];
