import type { NotificacionesDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificacionService {
  apiName = 'Default';
  

  create = (input: NotificacionesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificacionesDto>({
      method: 'POST',
      url: '/api/app/notificacion',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/notificacion/${id}`,
    },
    { apiName: this.apiName,...config });
  

  enviarEmailClienteUnaVez = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/notificacion/enviar-email-cliente-una-vez',
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificacionesDto>({
      method: 'GET',
      url: `/api/app/notificacion/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<NotificacionesDto>>({
      method: 'GET',
      url: '/api/app/notificacion',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getNotificacionUser = (UserId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificacionesDto[]>({
      method: 'GET',
      url: `/api/app/notificacion/notificacion-user/${UserId}`,
    },
    { apiName: this.apiName,...config });
  

  getSend = (message: string, IdUser: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificacionesDto>({
      method: 'GET',
      url: '/api/app/notificacion/send',
      params: { message, idUser: IdUser },
    },
    { apiName: this.apiName,...config });
  

  marcarLeidasByUserId = (UserId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/notificacion/marcar-leidas/${UserId}`,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: NotificacionesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, NotificacionesDto>({
      method: 'PUT',
      url: `/api/app/notificacion/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
