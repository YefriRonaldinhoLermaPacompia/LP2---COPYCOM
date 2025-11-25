import { Routes } from '@angular/router';

export const UsuariosRoutes: Routes = [
  {
    path: 'gestion',
    loadComponent: () => import('./gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent),
  },
];

