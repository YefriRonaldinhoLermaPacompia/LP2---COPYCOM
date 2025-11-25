import { Routes } from '@angular/router';

export const ProduccionRoutes: Routes = [
  {
    path: 'gestion',
    loadComponent: () => import('./gestion-produccion/gestion-produccion.component').then(m => m.GestionProduccionComponent),
  },
  {
    path: 'maquinas',
    loadComponent: () => import('./maquinas-tipos/maquinas-tipos.component').then(m => m.MaquinasTiposComponent),
  },
];
