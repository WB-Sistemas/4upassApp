import type { EstablecimientoDropDto, EstablecimientoDto, EstablecimientoNoTrackDto, UpdateEstabDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GetIdDto } from '../models';
import type { PrecioPer } from '../precios/models';

@Injectable({
  providedIn: 'root',
})
export class EstablecimientoService {
  apiName = 'Default';
  

  asignarEstablecimientoAClientes = (establecimientoId: string, clienteIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/establecimiento/asignar-establecimiento-aClientes/${establecimientoId}`,
      body: clienteIds,
    },
    { apiName: this.apiName,...config });
  

  create = (input: EstablecimientoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoDto>({
      method: 'POST',
      url: '/api/app/establecimiento',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/establecimiento/${id}`,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoDto>({
      method: 'GET',
      url: `/api/app/establecimiento/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getClientesAsignados = (establecimientoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string[]>({
      method: 'GET',
      url: `/api/app/establecimiento/clientes-asignados/${establecimientoId}`,
    },
    { apiName: this.apiName,...config });
  

  getEstabDrop = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoDropDto[]>({
      method: 'GET',
      url: '/api/app/establecimiento/estab-drop',
    },
    { apiName: this.apiName,...config });
  

  getEstabEvento = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoNoTrackDto>({
      method: 'GET',
      url: `/api/app/establecimiento/estab-evento/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getEstabMapeado = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoDropDto[]>({
      method: 'GET',
      url: '/api/app/establecimiento/estab-mapeado',
    },
    { apiName: this.apiName,...config });
  

  getEstablecimiento = (idEstab: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoNoTrackDto>({
      method: 'GET',
      url: '/api/app/establecimiento/establecimiento',
      params: { idEstab },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EstablecimientoDto>>({
      method: 'GET',
      url: '/api/app/establecimiento',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getLocalidades = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoNoTrackDto[]>({
      method: 'GET',
      url: '/api/app/establecimiento/localidades',
    },
    { apiName: this.apiName,...config });
  

  getNombreEstabMapeado = (dto: GetIdDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/establecimiento/nombre-estab-mapeado',
      params: { id: dto.id },
    },
    { apiName: this.apiName,...config });
  

  obtenerTipoPrecios = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PrecioPer[]>({
      method: 'POST',
      url: `/api/app/establecimiento/obtener-tipo-precios/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: EstablecimientoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EstablecimientoDto>({
      method: 'PUT',
      url: `/api/app/establecimiento/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateEstablecimiento = (input: UpdateEstabDto, idEvento: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/establecimiento/establecimiento',
      params: { idEvento },
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
