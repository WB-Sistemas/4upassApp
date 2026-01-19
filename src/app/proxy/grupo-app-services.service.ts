import type { CreateGrupoDTO, GetGrupoListFilterDto, GrupoDTO, GrupoYRRPPsDto, UpdateGrupoDTO } from './tickets/eventos/models';
import type { GetIdDto } from './tickets/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GrupoAppServicesService {
  apiName = 'Default';
  

  actualizarGrupo = (input: UpdateGrupoDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/grupo-app-services/actualizar-grupo',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  crearGrupo = (input: CreateGrupoDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/grupo-app-services/crear-grupo',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  create = (input: GrupoDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GrupoDTO>({
      method: 'POST',
      url: '/api/app/grupo-app-services',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/grupo-app-services/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GrupoDTO>({
      method: 'GET',
      url: `/api/app/grupo-app-services/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getGrupo = (input: GetGrupoListFilterDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GrupoDTO>>({
      method: 'GET',
      url: '/api/app/grupo-app-services/grupo',
      params: { nombre: input.nombre, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GrupoDTO>>({
      method: 'GET',
      url: '/api/app/grupo-app-services',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getTodosGruposYRrppsDelClienteActual = (input: GetIdDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GrupoYRRPPsDto>({
      method: 'GET',
      url: '/api/app/grupo-app-services/todos-grupos-yRrpps-del-cliente-actual',
      params: { id: input.id },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: GrupoDTO, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GrupoDTO>({
      method: 'PUT',
      url: `/api/app/grupo-app-services/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  borrarGrupo = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/grupo-app-services/${id}/borrar-grupo`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
