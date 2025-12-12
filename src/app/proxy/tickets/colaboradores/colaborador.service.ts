import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ColaboradorDTO, ColaboradorUpdate, GetColaboradoresInput } from '../eventos/models';

@Injectable({
  providedIn: 'root',
})
export class ColaboradorService {
  apiName = 'Default';
  

  crearColaborador = (input: ColaboradorDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/colaborador/crear-colaborador',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: ColaboradorDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ColaboradorUpdate>({
      method: 'POST',
      url: '/api/app/colaborador',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/colaborador/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteColaborador = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/colaborador/${id}/colaborador`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ColaboradorUpdate>({
      method: 'GET',
      url: `/api/app/colaborador/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getAllColaborador = (input: GetColaboradoresInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ColaboradorUpdate>>({
      method: 'GET',
      url: '/api/app/colaborador/colaborador',
      params: { clienteId: input.clienteId, userId: input.userId, nombreUsuario: input.nombreUsuario, dni: input.dni, email: input.email, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ColaboradorUpdate>>({
      method: 'GET',
      url: '/api/app/colaborador',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: ColaboradorDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ColaboradorUpdate>({
      method: 'PUT',
      url: `/api/app/colaborador/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateColaborador = (input: ColaboradorUpdate, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ColaboradorUpdate>({
      method: 'PUT',
      url: '/api/app/colaborador/colaborador',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
