import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}

@Component({
  selector: 'app-daily-activities',
  imports: [MaterialModule],
  templateUrl: './daily-activities.component.html',
})
export class AppDailyActivitiesComponent {
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      subtext: 'Pago recibido de Constructora ABC por S/ 2,850.00',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'warning',
      title: 'Nuevo pedido registrado',
      link: '#PED-2025-001',
    },
    {
      id: 3,
      time: '11.45 am',
      color: 'secondary',
      subtext: 'Pedido #PED-2025-002 completado y entregado',
    },
    {
      id: 4,
      time: '02.15 pm',
      color: 'primary',
      title: 'Nuevo cliente registrado',
      link: '#CLI-045',
    },
    {
      id: 5,
      time: '03.30 pm',
      color: 'warning',
      subtext: 'Servicio técnico programado para mañana',
    },
    {
      id: 6,
      time: '04.45 pm',
      color: 'secondary',
      subtext: 'Cotización enviada a Colegio San José',
    },
  ];
}
