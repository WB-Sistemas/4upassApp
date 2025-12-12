import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IActionResult } from '../../microsoft/asp-net-core/mvc/models';
import type { NotificacionWebHookData } from '../notificaciones/models';

@Injectable({
  providedIn: 'root',
})
export class CustomUrlService {
  apiName = 'Default';
  

  descargarComprobanteById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/descargar/${id}`,
    },
    { apiName: this.apiName,...config });
  

  descargarCortesiaByCortesiaId = (cortesiaId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/imprimir-cortesia/${cortesiaId}`,
    },
    { apiName: this.apiName,...config });
  

  descargarEntradaByEntradaId = (entradaId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/imprimir-entrada/${entradaId}`,
    },
    { apiName: this.apiName,...config });
  

  descargarEntradasById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/imprimir-entradas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getEmailById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/email/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getFacturaById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/factura/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getUrlById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: `/li/${id}`,
    },
    { apiName: this.apiName,...config });
  

  postEmailStatusByBody = (body: NotificacionWebHookData, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/email-wh',
      body: body,
    },
    { apiName: this.apiName,...config });
  

  uptime = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'GET',
      url: '/uptime',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
