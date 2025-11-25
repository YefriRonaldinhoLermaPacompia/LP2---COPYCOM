import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Envio } from '../../../models/envio.model';

@Injectable({ providedIn: 'root' })
export class EnvioService extends EntityDataService<Envio[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.envio);
  }

}

