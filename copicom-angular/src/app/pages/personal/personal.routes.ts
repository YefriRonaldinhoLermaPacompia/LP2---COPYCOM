import { Routes } from '@angular/router';

export const PersonalRoutes: Routes = [
  {
    path: 'gestion',
    loadComponent: () => import('./gestion-personal/gestion-personal.component').then(m => m.GestionPersonalComponent),
  },
];

