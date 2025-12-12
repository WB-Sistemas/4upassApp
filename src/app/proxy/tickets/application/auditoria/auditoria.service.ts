import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { AuditoriaUserDto, GetEventosAuditoriaDto } from '../contracts/auditoria/models';
import type { GetIdDto } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class AuditoriaService {
  apiName = 'Default';
  

  getEventosAuditores = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetEventosAuditoriaDto[]>({
      method: 'GET',
      url: '/api/app/auditoria/eventos-auditores',
    },
    { apiName: this.apiName,...config });
  

  getUsersWithAuditoria = (input: GetIdDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AuditoriaUserDto[]>({
      method: 'GET',
      url: '/api/app/auditoria/users-with-auditoria',
      params: { id: input.id },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
