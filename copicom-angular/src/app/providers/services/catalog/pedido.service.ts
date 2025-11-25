import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EntityDataService } from '../../utils/entity-data.service';
import { END_POINTS } from '../../utils/end-points';
import { Pedido } from '../../../models/pedido.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService extends EntityDataService<Pedido[]> {

  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.pedido);
  }

  obtenerPorCliente$(clienteId: number): Observable<Pedido[]> {
    return this.httpClient.get<Pedido[]>(`${END_POINTS.pedido}/cliente/${clienteId}`);
  }

  actualizarEstado$(id: number, estado: string): Observable<Pedido> {
    return this.httpClient.patch<Pedido>(`${END_POINTS.pedido}/${id}/estado`, { estado });
  }

  rastrearPedido$(serie: string, numero: string): Observable<Pedido> {
    return this.httpClient.get<Pedido>(`${END_POINTS.pedido}/rastrear`, {
      params: { serie, numero }
    });
  }

  buscarPedidos$(serie?: string, numero?: string): Observable<Pedido[]> {
    const params: any = {};
    if (serie) params.serie = serie;
    if (numero) params.numero = numero;
    return this.httpClient.get<Pedido[]>(`${END_POINTS.pedido}/buscar`, { params });
  }
}

