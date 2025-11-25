import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EntityDataService} from '../../utils/entity-data.service';
import {END_POINTS} from '../../utils/end-points';
import {Category} from "../../../models/categoria.model";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {Product} from "../../../models/product.model";


@Injectable({providedIn: 'root'})
export class ProductService
  extends EntityDataService<Product[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.product);
  }
  public buscarPorNombre(filtro: string): Observable<Category[]> {
    return this.httpClient.get<Category[]>(
      `${environment.url}${this.endPoint}/buscar?filtro=${encodeURIComponent(filtro)}`
    );
  }

}
