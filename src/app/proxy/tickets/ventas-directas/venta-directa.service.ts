import type { SendEmailVentaDirectaDto, VerDisponibilidadDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { IniciarCompraDto } from '../entradas/models';
import type { DtoReturnErrorData } from '../eventos/models';
import type { SolicitudPagoDto } from '../pagos/models';

@Injectable({
  providedIn: 'root',
})
export class VentaDirectaService {
  apiName = 'Default';
  

  esBoleteria = (eventoId: string, rrppId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/venta-directa/es-boleteria',
      params: { eventoId, rrppId },
    },
    { apiName: this.apiName,...config });
  

  generarSolicitud = (finalizarCompraDto: SendEmailVentaDirectaDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SolicitudPagoDto>({
      method: 'POST',
      url: '/api/app/venta-directa/generar-solicitud',
      body: finalizarCompraDto,
    },
    { apiName: this.apiName,...config });
  

  getVerDisponibilidad = (eventoId: string, skipCount: number, maxResultCount: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<VerDisponibilidadDto>>({
      method: 'GET',
      url: `/api/app/venta-directa/ver-disponibilidad/${eventoId}`,
      params: { skipCount, maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  iniciarCompraVentaDirecta = (iniciarCompraDto: IniciarCompraDto, cancellationToken?: any, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<object>>({
      method: 'POST',
      url: '/api/app/venta-directa/iniciar-compra-venta-directa',
      body: iniciarCompraDto,
    },
    { apiName: this.apiName,...config });
  

  updateYFinalizarCompraVentaDirecta = (dto: SendEmailVentaDirectaDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/venta-directa/y-finalizar-compra-venta-directa',
      body: dto,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
