import type { ControlEntradasDTO, ControlEntradasInputDTO, ControlEntradasOutputDTO } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ControlEntradasService {
  apiName = 'Default';
  

  actualizarControlEntrada = (eventoId: string, input: ControlEntradasInputDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/control-entradas/actualizar-control-entrada/${eventoId}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  crearControlEntrada = (eventoId: string, input: ControlEntradasInputDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/control-entradas/crear-control-entrada/${eventoId}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: ControlEntradasDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlEntradasDTO>({
      method: 'POST',
      url: '/api/app/control-entradas',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/control-entradas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlEntradasDTO>({
      method: 'GET',
      url: `/api/app/control-entradas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getByControlEntradas = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlEntradasOutputDTO>({
      method: 'GET',
      url: `/api/app/control-entradas/by-control-entradas/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ControlEntradasDTO>>({
      method: 'GET',
      url: '/api/app/control-entradas',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  primerFechaEventoFuturo = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/control-entradas/primer-fecha-evento-futuro/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ControlEntradasDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ControlEntradasDTO>({
      method: 'PUT',
      url: `/api/app/control-entradas/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
