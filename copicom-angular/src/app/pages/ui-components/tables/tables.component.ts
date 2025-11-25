import {CommonModule} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MaterialModule} from 'src/app/material.module';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {CategoryService} from "../../../providers/services/catalog/category.service";
import {Category} from "../../../models/categoria.model";
import {MatDialog} from '@angular/material/dialog';
import {CategoryDialogComponent} from "./category-dialog/category-dialog.component";

// table 1
export interface productsData {
  id: number;
  imagePath: string;
  uname: string;
  budget: number;
  priority: string;
}

const PRODUCT_DATA: productsData[] = [
  {
    id: 1,
    imagePath: 'assets/images/products/product-1.png',
    uname: 'iPhone 13 pro max-Pacific Blue-128GB storage',
    budget: 180,
    priority: 'confirmed',
  },
  {
    id: 2,
    imagePath: 'assets/images/products/product-2.png',
    uname: 'Apple MacBook Pro 13 inch-M1-8/256GB-space',
    budget: 90,
    priority: 'cancelled',
  },
  {
    id: 3,
    imagePath: 'assets/images/products/product-3.png',
    uname: 'PlayStation 5 DualSense Wireless Controller',
    budget: 120,
    priority: 'rejected',
  },
  {
    id: 4,
    imagePath: 'assets/images/products/product-4.png',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
  {
    id: 5,
    imagePath: 'assets/images/products/product-4.png',
    uname: 'Amazon Basics Mesh, Mid-Back, Swivel Office',
    budget: 160,
    priority: 'confirmed',
  },
];

@Component({
  selector: 'app-tables',
  imports: [
    MatTableModule,
    CommonModule,
    MatCardModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './tables.component.html',
})
export class AppTablesComponent implements OnInit {
  // table 1
  displayedColumns: string[] = ['nombre'
    , 'descripcion', 'codigo', 'fechaCreacion', 'acciones'
  ];
  /**
   *
   *   "nombre"?: string,
   *   "descripcion"?: string,
   *   "codigo"?: string,
   *   "fechaCreacion"?: string,
   *   "fechaModificacion"?: string
   * */
  dataSource1 = PRODUCT_DATA;
  public categories: Category[] = [];
  isLoading: boolean;


  constructor(private categoryService: CategoryService, private dialog: MatDialog,) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.isLoading = true;
    this.categoryService.getAll$().subscribe(response => {
      this.categories = response;
      console.log(response);
      this.isLoading = false;
    });
  }

  openCreateDialog() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {categoria: null, mode: 'create'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.saveCategory(result);
    });

  }

  private saveCategory(category: Category): void {
    this.categoryService.add$(category).subscribe(response => {
      if (response) {
        this.getCategories();
      }
    })
  }

  getEstadoClass(categoria: Category) {
    //this._categoria = categoria;
    return undefined;
  }

  getEstadoText(categoria: Category) {
    return "";
  }

  openEditDialog(categoria: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '600px',
      disableClose: true,
      data: {categoria: categoria, mode: 'edit'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.saveEditCategory(categoria.id, result);
    });

  }

  private saveEditCategory(id: number | undefined, categoria: Category) {
    this.categoryService.update$(id, categoria).subscribe(response => {
      if (response) {
        this.getCategories();
      }
    })
  }

  deleteCategoria(categoria: Category) {
    this.categoryService.delete$(categoria.id).subscribe(response => {
      if (response) {
        this.getCategories();
      }
    })
  }
}
