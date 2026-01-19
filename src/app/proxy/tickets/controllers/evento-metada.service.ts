import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../../microsoft/asp-net-core/mvc/models';

@Injectable({
  providedIn: 'root',
})
export class EventoMetadaService {
  apiName = 'Default';
  

  getDetalleEventoById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/detalle-evento/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getUrlById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/evento/${id}`,
    },
    { apiName: this.apiName,...config });
  

  redirectEventosCatchAllByPath = (path: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/eventos/${path}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
