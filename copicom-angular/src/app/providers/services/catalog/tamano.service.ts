import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Tamano } from 'src/app/models/tamano.model';


@Injectable({ providedIn: 'root' })
export class TamanoService extends EntityDataService<Tamano[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.tamano);
  }
}
