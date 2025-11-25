import { Routes } from '@angular/router';

export const PedidosRoutes: Routes = [
  {
    path: 'registrar',
    loadComponent: () => import('./registrar-pedido/registrar-pedido.component').then(m => m.RegistrarPedidoComponent),
  },
  {
    path: 'gestion',
    loadComponent: () => import('./gestionar-pedidos/gestionar-pedidos.component').then(m => m.GestionarPedidosComponent),
  },
  {
    path: 'consulta-estado',
    loadComponent: () => import('./consulta-estado/consulta-estado.component').then(m => m.ConsultaEstadoComponent),
  },
  {
    path: 'rastrear',
    loadComponent: () => import('./rastrear-pedido/rastrear-pedido.component').then(m => m.RastrearPedidoComponent),
  },
  {
    path: 'registrar-cliente',
    loadComponent: () => import('./registrar-cliente/registrar-cliente.component').then(m => m.RegistrarClienteComponent),
  },
];

