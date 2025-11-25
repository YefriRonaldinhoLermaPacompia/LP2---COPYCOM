import { Component, OnInit } from '@angular/core';
import { Sale } from "../../../models/sale.model";
import { SaleService } from "../../../providers/services/sale/sale.service";
import { MatCardModule } from '@angular/material/card';

import { MatTableModule } from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SaleDialogComponent } from "./sale-dialog/sale-dialog.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-sales',
  imports: [
    MatCardModule,
    MatTableModule,
    MatButton,
    MatIconModule
  ],
  standalone: true,
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  public isLoading: boolean = false;
  public sales: Sale[] = [];

  displayedColumns: string[] = ['dni', 'clienteNombre', 'serie', 'numeroFactura', 'total'];

  constructor(private saleService: SaleService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getSales();
  }

  private getSales(): void {
    this.isLoading = true;
    this.saleService.getAll$().subscribe((sales: Sale[]) => {
      this.sales = sales;
      this.isLoading = false;
      console.log(this.sales);
    });
  }

  /** Abrir modal de creación */
  public openCreateDialog(): void {
    const dialogRef = this.dialog.open(SaleDialogComponent, {
      width: '600px',
      disableClose: true,
      data: { sale: null, mode: 'create' }
    });

    dialogRef.afterClosed().subscribe(result => {
      /** SOLO GUARDAR SI HAY DATA (Cancelar devuelve null) */
      if (result) {
        this.saleSave(result);
      }
    });
  }

  /** Guardar venta */
  private saleSave(sale: any): void {
    this.saleService.add$(sale).subscribe(result => {
      if (result) {
        this.getSales();
      }
    });
  }
}
