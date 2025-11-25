import { Routes } from '@angular/router';

export const ReportesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./reportes.component').then(m => m.ReportesComponent),
  },
];

