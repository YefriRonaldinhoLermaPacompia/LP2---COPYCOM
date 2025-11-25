import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Trabajador } from '../../../models/trabajador.model';

@Injectable({ providedIn: 'root' })
export class TrabajadorService extends EntityDataService<Trabajador[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.trabajador);
  }

}

