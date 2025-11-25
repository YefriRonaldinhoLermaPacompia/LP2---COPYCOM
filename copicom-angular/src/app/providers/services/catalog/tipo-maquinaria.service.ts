import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { TipoMaquinaria } from '../../../models/tipo-maquinaria.model';

@Injectable({ providedIn: 'root' })
export class TipoMaquinariaService extends EntityDataService<TipoMaquinaria[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.tipoMaquinaria);
  }

}

