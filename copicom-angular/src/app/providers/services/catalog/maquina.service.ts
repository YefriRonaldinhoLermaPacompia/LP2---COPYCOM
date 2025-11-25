import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Maquina } from '../../../models/maquina.model';

@Injectable({ providedIn: 'root' })
export class MaquinaService extends EntityDataService<Maquina[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.maquina);
  }

}

