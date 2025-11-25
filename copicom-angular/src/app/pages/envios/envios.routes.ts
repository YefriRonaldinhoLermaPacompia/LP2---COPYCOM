import { Routes } from '@angular/router';

export const EnviosRoutes: Routes = [
  {
    path: 'gestion',
    loadComponent: () => import('./gestion-envios/gestion-envios.component').then(m => m.GestionEnviosComponent),
  },
];
