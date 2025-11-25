import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Sale } from "../../../models/sale.model";


@Injectable({ providedIn: 'root' })
export class SaleService extends EntityDataService<Sale[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.sale);
  }

}
