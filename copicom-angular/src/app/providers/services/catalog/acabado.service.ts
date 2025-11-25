import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Acabado } from 'src/app/models/acabado.model';


@Injectable({ providedIn: 'root' })
export class AcabadoService extends EntityDataService<Acabado[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.acabado);
  }
}
