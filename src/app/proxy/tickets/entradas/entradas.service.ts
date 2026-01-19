import type { BuscarTicketQRResult, CompraDto, DatoCompraDto, ETicketsDto, EntradaSimpleDto, EntradasDto, EntradasGetDto, FinalizarCompraDto, IniciarCompraDto, UpdateDatosUsuarioForETickets } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { ListResultDto, PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { DatosCompraDto } from '../compras/models';
import type { ErroresAsientoDto } from '../establecimientos/models';
import type { DtoReturnError, DtoReturnErrorData } from '../eventos/models';
import type { IActionResult } from '../../microsoft/asp-net-core/mvc/models';
import type { MercadoPagoTransient_WebhookRequest, SolicitudPagoDto } from '../pagos/models';
import type { OpenpayWebhookPayload } from '../pagos/openpay-ar/models';

@Injectable({
  providedIn: 'root',
})
export class EntradasService {
  apiName = 'Default';
  

  buscarTicketQR = (eventoId: string, idLegible: string, isModal?: boolean, seccionSelected?: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<BuscarTicketQRResult>>({
      method: 'POST',
      url: `/api/app/entradas/buscar-ticket-qR/${eventoId}`,
      params: { idLegible, isModal, seccionSelected },
    },
    { apiName: this.apiName,...config });
  

  cancelarCompraBorrador = (compraId: string, solicitudId?: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entradas/cancelar-compra-borrador',
      params: { compraId, solicitudId },
    },
    { apiName: this.apiName,...config });
  

  create = (input: EntradasDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntradasDto>({
      method: 'POST',
      url: '/api/app/entradas',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/entradas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  editETicketsByEntradaIdAndUpdateDatoUsuarioDto = (entradaId: string, updateDatoUsuarioDto: UpdateDatosUsuarioForETickets, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/entradas/edit-eTickets/${entradaId}`,
      body: updateDatoUsuarioDto,
    },
    { apiName: this.apiName,...config });
  

  finalizarCompra = (finalizarCompraDto: FinalizarCompraDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entradas/finalizar-compra',
      body: finalizarCompraDto,
    },
    { apiName: this.apiName,...config });
  

  generarQrEntradaByIdCompra = (compraId: string, timeZoneName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'POST',
      url: `/api/app/entradas/generar-qr-entrada-by-id-compra/${compraId}`,
      params: { timeZoneName },
    },
    { apiName: this.apiName,...config });
  

  generarQrEntradaByIds = (entradasIds: string[], timeZoneName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'POST',
      url: '/api/app/entradas/generar-qr-entrada-by-ids',
      params: { timeZoneName },
      body: entradasIds,
    },
    { apiName: this.apiName,...config });
  

  generarSolicitud = (finalizarCompraDto: FinalizarCompraDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SolicitudPagoDto>({
      method: 'POST',
      url: '/api/app/entradas/generar-solicitud',
      body: finalizarCompraDto,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntradasDto>({
      method: 'GET',
      url: `/api/app/entradas/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getDatosCompra = (compraId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DatosCompraDto>({
      method: 'GET',
      url: `/api/app/entradas/datos-compra/${compraId}`,
    },
    { apiName: this.apiName,...config });
  

  getDatosFactura = (compraId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'GET',
      url: `/api/app/entradas/datos-factura/${compraId}`,
    },
    { apiName: this.apiName,...config });
  

  getETickets = (compraId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<ListResultDto<ETicketsDto>>>({
      method: 'GET',
      url: `/api/app/entradas/e-tickets/${compraId}`,
    },
    { apiName: this.apiName,...config });
  

  getEntradasNum = (funcionId: string, sectorId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntradasGetDto[]>({
      method: 'GET',
      url: '/api/app/entradas/entradas-num',
      params: { funcionId, sectorId },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<EntradasDto>>({
      method: 'GET',
      url: '/api/app/entradas',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListEntradas = (eventoId: string, input: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntradaSimpleDto[]>({
      method: 'GET',
      url: `/api/app/entradas/entradas/${eventoId}`,
      params: { input },
    },
    { apiName: this.apiName,...config });
  

  iniciarCompra = (iniciarCompraDto: IniciarCompraDto, cancellationToken?: any, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnErrorData<object>>({
      method: 'POST',
      url: '/api/app/entradas/iniciar-compra',
      body: iniciarCompraDto,
    },
    { apiName: this.apiName,...config });
  

  marcarEntradaCompartida = (entradaId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/entradas/marcar-entrada-compartida/${entradaId}`,
    },
    { apiName: this.apiName,...config });
  

  mercadoPagoWebHook = (compraId: string, request: MercadoPagoTransient_WebhookRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: `/api/app/entradas/mercado-pago-web-hook/${compraId}`,
      params: { type: request.type, topic: request.topic, id: request.id, ["data.id"]: request.data.id },
    },
    { apiName: this.apiName,...config });
  

  mercadoPagoWebHookGeneric = (request: MercadoPagoTransient_WebhookRequest, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/app/entradas/mercado-pago-web-hook',
      params: { type: request.type, topic: request.topic, id: request.id, ["data.id"]: request.data.id },
    },
    { apiName: this.apiName,...config });
  

  openpayArWebHook = (compraId: string, payload: OpenpayWebhookPayload, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: `/api/app/entradas/openpay-ar-web-hook/${compraId}`,
      body: payload,
    },
    { apiName: this.apiName,...config });
  

  openpayArWebHookGeneric = (payload: OpenpayWebhookPayload, config?: Partial<Rest.Config>) =>
    this.restService.request<any, IActionResult>({
      method: 'POST',
      url: '/api/app/entradas/openpay-ar-web-hook',
      body: payload,
    },
    { apiName: this.apiName,...config });
  

  pagoExitosoWebHookByJson = (json: object, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entradas/pago-exitoso-web-hook',
      body: json,
    },
    { apiName: this.apiName,...config });
  

  proxyImport = (a: CompraDto, b: ErroresAsientoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/entradas/proxy-import',
      body: b,
    },
    { apiName: this.apiName,...config });
  

  reenviarCortesia = (compraId: string, cantidad: number, email: string, nombre: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'POST',
      url: `/api/app/entradas/reenviar-cortesia/${compraId}`,
      params: { cantidad, email, nombre },
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: EntradasDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, EntradasDto>({
      method: 'PUT',
      url: `/api/app/entradas/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateCompraPendiente = (finalizarCompraDto: FinalizarCompraDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/entradas/compra-pendiente',
      body: finalizarCompraDto,
    },
    { apiName: this.apiName,...config });
  

  updateDatoCompraDto = (datos: DatoCompraDto, compraId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DatoCompraDto>({
      method: 'PUT',
      url: `/api/app/entradas/dato-compra-dto/${compraId}`,
      body: datos,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
