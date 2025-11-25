import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Color } from 'src/app/models/color.model';


@Injectable({ providedIn: 'root' })
export class ColorService extends EntityDataService<Color[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.color);
  }
}
