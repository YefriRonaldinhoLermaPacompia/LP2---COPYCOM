import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  position: string;
  hrate: number;
  skills: string;
  priority: string;
  progress: string;
}

const ELEMENT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/dash-prd-1.jpg',
    uname: 'PED-2025-001',
    position: 'Constructora ABC',
    skills: '2,850',
    hrate: 85,
    priority: 'Alta',
    progress: 'warning',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/dash-prd-2.jpg',
    uname: 'PED-2025-002',
    position: 'Colegio San José',
    skills: '1,450',
    hrate: 60,
    priority: 'Media',
    progress: 'secondary',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/dash-prd-3.jpg',
    uname: 'PED-2025-003',
    position: 'Clínica San Pablo',
    skills: '3,200',
    hrate: 95,
    priority: 'Urgente',
    progress: 'error',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/dash-prd-4.jpg',
    uname: 'PED-2025-004',
    position: 'Empresa Telecom',
    skills: '1,800',
    hrate: 45,
    priority: 'Normal',
    progress: 'success',
  },
];
@Component({
  selector: 'app-revenue-product',
  imports: [MaterialModule, MatMenuModule, MatButtonModule, CommonModule],
  templateUrl: './revenue-product.component.html',
})
export class AppRevenueProductComponent {
  displayedColumns: string[] = ['assigned', 'progress', 'priority', 'budget'];
  dataSource = ELEMENT_DATA;

  constructor() {}
}
