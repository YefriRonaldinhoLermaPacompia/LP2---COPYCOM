import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { TipoGeneracion } from 'src/app/models/tipo-generacion.model';


@Injectable({ providedIn: 'root' })
export class GeneracionService extends EntityDataService<TipoGeneracion[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.generacion);
  }
}
