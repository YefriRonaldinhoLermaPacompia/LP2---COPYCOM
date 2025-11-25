import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Pago } from '../../../models/pago.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService extends EntityDataService<Pago[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.pago);
  }

  obtenerPorVenta$(ventaId: number): Observable<Pago[]> {
    return this.httpClient.get<Pago[]>(`${END_POINTS.pago}/venta/${ventaId}`);
  }
}

