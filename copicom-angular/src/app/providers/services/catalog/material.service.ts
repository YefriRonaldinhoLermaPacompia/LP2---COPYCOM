import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Material } from 'src/app/models/material.model';


@Injectable({ providedIn: 'root' })
export class MaterialService extends EntityDataService<Material[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.material);
  }
}
