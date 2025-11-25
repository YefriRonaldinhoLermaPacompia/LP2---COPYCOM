import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },

  {
    divider: true,
    navCap: 'GESTIÓN',
  },
  {
    displayName: 'Gestión de Usuarios',
    iconName: 'solar:users-group-two-rounded-line-duotone',
    children: [
      {
        displayName: 'Registrar Cliente',
        route: '/pedidos/registrar-cliente',
        subItemIcon: true,
      },
      {
        displayName: 'Usuarios y Roles',
        route: '/usuarios/gestion',
        subItemIcon: true,
      },
    ],
  },
  {
    displayName: 'Servicios',
    iconName: 'solar:box-line-duotone',
    children: [
      {
        displayName: 'Catálogo de Servicios',
        route: '/servicios/catalogo',
        subItemIcon: true,
      },
      {
        displayName: 'Administrar Servicios',
        route: '/ui-components/servicios',
        subItemIcon: true,
      },
      {
        displayName: 'Generar Cotización',
        route: '/servicios/cotizacion',
        subItemIcon: true,
      },
    ],
  },
  {
    displayName: 'Pedidos',
    iconName: 'solar:cart-large-2-line-duotone',
    children: [
      {
        displayName: 'Registrar Pedido',
        route: '/pedidos/registrar',
        subItemIcon: true,
      },
      {
        displayName: 'Administrar Pedidos',
        route: '/pedidos/gestion',
        subItemIcon: true,
      },
      {
        displayName: 'Consultar Estado',
        route: '/pedidos/consulta-estado',
        subItemIcon: true,
      },
      {
        displayName: 'Rastrear Pedido',
        route: '/pedidos/rastrear',
        subItemIcon: true,
      },
    ],
  },
  {
    divider: true,
    navCap: 'PRODUCCIÓN',
  },
  {
    displayName: 'Producción',
    iconName: 'solar:factory-line-duotone',
    children: [
      {
        displayName: 'Gestionar Producción',
        route: '/produccion/gestion',
        subItemIcon: true,
      },
      {
        displayName: 'Máquinas y Tipos',
        route: '/produccion/maquinas',
        subItemIcon: true,
      },
    ],
  },
  {
    displayName: 'Personal',
    iconName: 'solar:users-group-two-rounded-line-duotone',
    route: '/personal/gestion',
  },
  {
    divider: true,
    navCap: 'FINANZAS Y LOGÍSTICA',
  },
  {
    displayName: 'Pagos',
    iconName: 'solar:card-send-line-duotone',
    children: [
      {
        displayName: 'Registrar Pago',
        route: '/pagos/registrar',
        subItemIcon: true,
      },
      {
        displayName: 'Historial de Pagos',
        route: '/pagos/historial',
        subItemIcon: true,
      },
    ],
  },
  {
    displayName: 'Envíos',
    iconName: 'solar:delivery-line-duotone',
    route: '/envios/gestion',
  },
  {
    displayName: 'Reportes',
    iconName: 'solar:chart-2-line-duotone',
    route: '/reportes',
  },
  {
    divider: true,
    navCap: 'CATÁLOGOS',
  },
  {
    displayName: 'Tamaños',
    iconName: 'solar:ruler-line-duotone',
    route: '/ui-components/tamanos',
  },
  {
    displayName: 'Acabados',
    iconName: 'solar:pallete-2-line-duotone',
    route: '/ui-components/acabados',
  },
  {
    displayName: 'Colores',
    iconName: 'solar:pallete-line-duotone',
    route: '/ui-components/colores',
  },
  {
    displayName: 'Materiales',
    iconName: 'solar:box-minimalistic-line-duotone',
    route: '/ui-components/materiales',
  },
  {
    displayName: 'Generación',
    iconName: 'solar:printer-2-line-duotone',
    route: '/ui-components/generaciones',
  },
];
