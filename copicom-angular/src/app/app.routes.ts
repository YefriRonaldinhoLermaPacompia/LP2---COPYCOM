import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/authentication/login',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.routes').then((m) => m.PagesRoutes),
      },
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.routes').then(
            (m) => m.UiComponentsRoutes
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
      },
      {
        path: 'pedidos',
        loadChildren: () =>
          import('./pages/pedidos/pedidos.routes').then((m) => m.PedidosRoutes),
      },
      {
        path: 'servicios',
        loadChildren: () =>
          import('./pages/servicios/servicios.routes').then((m) => m.ServiciosRoutes),
      },
      {
        path: 'produccion',
        loadChildren: () =>
          import('./pages/produccion/produccion.routes').then((m) => m.ProduccionRoutes),
      },
      {
        path: 'pagos',
        loadChildren: () =>
          import('./pages/pagos/pagos.routes').then((m) => m.PagosRoutes),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('./pages/usuarios/usuarios.routes').then((m) => m.UsuariosRoutes),
      },
      {
        path: 'personal',
        loadChildren: () =>
          import('./pages/personal/personal.routes').then((m) => m.PersonalRoutes),
      },
      {
        path: 'envios',
        loadChildren: () =>
          import('./pages/envios/envios.routes').then((m) => m.EnviosRoutes),
      },
      {
        path: 'reportes',
        loadChildren: () =>
          import('./pages/reportes/reportes.routes').then((m) => m.ReportesRoutes),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./pages/authentication/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
