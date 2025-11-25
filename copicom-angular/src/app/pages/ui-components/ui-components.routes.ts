import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './chips/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppMenuComponent } from './menu/menu.component';
import { AppTooltipsComponent } from './tooltips/tooltips.component';
import { AppFormsComponent } from './forms/forms.component';
import { AppTablesComponent } from './tables/tables.component';
import {SalesComponent} from "./sales/sales.component";
import { TamanoComponent } from './tamano/tamano.component';
import { AcabadoComponent } from './acabado/acabado.component';
import { ColorComponent } from './color/color.component';
import { MaterialComponent } from './material/material.component';
import { GeneracionComponent } from './generacion/generacion.component';
import { ServicioComponent } from './servicio/servicio.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppMenuComponent,
      },
      {
        path: 'tooltips',
        component: AppTooltipsComponent,
      },
      {
        path: 'forms',
        component: AppFormsComponent,
      },
      {
        path: 'tamanos',
        component: TamanoComponent,
      },
      {
        path: 'acabados',
        component: AcabadoComponent,
      },
      {
        path: 'colores',
        component: ColorComponent,
      },
      {
        path: 'materiales',
        component: MaterialComponent,
      },
      {
        path: 'generaciones',
        component: GeneracionComponent,
      },
      {
        path: 'servicios',
        component: ServicioComponent,
      },
      {
        path: 'sales',
        component: SalesComponent,
      },

    ],
  },
];
