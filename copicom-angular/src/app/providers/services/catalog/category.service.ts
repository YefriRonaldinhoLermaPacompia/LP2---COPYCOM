import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Category } from "../../../models/categoria.model";


@Injectable({ providedIn: 'root' })
export class CategoryService extends EntityDataService<Category[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.category);
  }
}
