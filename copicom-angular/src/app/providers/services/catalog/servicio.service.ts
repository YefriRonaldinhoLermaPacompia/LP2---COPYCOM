import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { Servicio } from 'src/app/models/servicio.model';

@Injectable({ providedIn: 'root' })
export class ServicioService extends EntityDataService<Servicio> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.servicio);
  }

  /** ================================
   *  🔍 Buscar servicios por nombre
   *  ================================ */
  public buscarPorNombre(filtro: string): Observable<Servicio[]> {
    return this.httpClient.get<Servicio[]>(`${environment.url}${this.endPoint}/buscar?filtro=${filtro}`);
  }

  /** ================================
   *  📌 Listas para los SELECT
   *  ================================ */
  getTamanos(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.url}${END_POINTS.tamano}`);
  }

  getColores(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.url}${END_POINTS.color}`);
  }

  getMateriales(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.url}${END_POINTS.material}`);
  }

  getAcabados(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.url}${END_POINTS.acabado}`);
  }

  getTipoGeneraciones(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.url}${END_POINTS.generacion}`);
  }
}
