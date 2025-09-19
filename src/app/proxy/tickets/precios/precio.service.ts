import type { PrecioDto, PrecioFiltroDto, PreciosDescuentos, TipoPrecioYSectoresDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { EstadoPrecio } from '../../estado-precio.enum';
import type { PreciosSectoresDto } from '../eventos/models';

@Injectable({
  providedIn: 'root',
})
export class PrecioService {
  apiName = 'Default';
  

  create = (input: PrecioDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrecioDto>({
      method: 'POST',
      url: '/api/app/precio',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/precio/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrecioDto>({
      method: 'GET',
      url: `/api/app/precio/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PrecioDto>>({
      method: 'GET',
      url: '/api/app/precio',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getPreciosByFuncionOrEvento = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrecioFiltroDto[]>({
      method: 'GET',
      url: `/api/app/precio/${id}/precios-by-funcion-or-evento`,
    },
    { apiName: this.apiName,...config });
  

  getTiposPreciosAndSectores = (funcionId: string, estados: EstadoPrecio[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, TipoPrecioYSectoresDto[]>({
      method: 'GET',
      url: `/api/app/precio/tipos-precios-and-sectores/${funcionId}`,
      params: { estados },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: PrecioDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrecioDto>({
      method: 'PUT',
      url: `/api/app/precio/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getPrecioDescuento = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PreciosDescuentos>({
      method: 'GET',
      url: `/api/app/precio/get-precio-descuento/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getPrecios = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PreciosSectoresDto[]>({
      method: 'GET',
      url: `/api/app/precio/get-precios/${funcionId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
