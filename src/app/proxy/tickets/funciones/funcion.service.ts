import type { GetPrecioByFuncionDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { FuncionDto, FuncionNoTrackDto } from '../eventos/models';

@Injectable({
  providedIn: 'root',
})
export class FuncionService {
  apiName = 'Default';
  

  create = (input: FuncionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionDto>({
      method: 'POST',
      url: '/api/app/funcion',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/funcion/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionDto>({
      method: 'GET',
      url: `/api/app/funcion/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getFuncion = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionNoTrackDto>({
      method: 'GET',
      url: `/api/app/funcion/funcion/${funcionId}`,
    },
    { apiName: this.apiName,...config });
  

  getFunciones = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionDto[]>({
      method: 'GET',
      url: `/api/app/funcion/funciones/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<FuncionDto>>({
      method: 'GET',
      url: '/api/app/funcion',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getPrecioByFuncion = (FuncionId: string, VentaDirectaId: string, esMapeado?: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetPrecioByFuncionDto[]>({
      method: 'GET',
      url: '/api/app/funcion/precio-by-funcion',
      params: { funcionId: FuncionId, ventaDirectaId: VentaDirectaId, esMapeado },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: FuncionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionDto>({
      method: 'PUT',
      url: `/api/app/funcion/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
