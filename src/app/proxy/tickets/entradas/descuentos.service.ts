import { RestService, Rest } from '@abp/ng.core';
import type { PagedAndSortedResultRequestDto, PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CortesiaCreatedDto, CortesiaDto, DescuentoDto } from '../descuentos/models';
import type { CortesiaSectoresIdDto, DtoReturnError, SendCortesiasDto } from '../eventos/models';
import type { CortesiaArchivoDto, DescuentoSimpleDto, InputCuponesIndividualesDto } from '../../models';
import type { UsuarioDto } from '../usuarios/models';

@Injectable({
  providedIn: 'root',
})
export class DescuentosService {
  apiName = 'Default';
  

  anularCortesia = (cortesiaId: string, setearVentaDirectaNull?: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/descuentos/anular-cortesia/${cortesiaId}`,
      params: { setearVentaDirectaNull },
    },
    { apiName: this.apiName,...config });
  

  anularCortesiaMultiple = (cortesiaIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/descuentos/anular-cortesia-multiple',
      body: cortesiaIds,
    },
    { apiName: this.apiName,...config });
  

  create = (input: DescuentoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoDto>({
      method: 'POST',
      url: '/api/app/descuentos',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createCortesias = (dto: CortesiaArchivoDto[], crearYEnviar?: boolean, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CortesiaCreatedDto[]>({
      method: 'POST',
      url: '/api/app/descuentos/cortesias',
      params: { crearYEnviar },
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  delete = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/descuentos/${id}`,
    },
    { apiName: this.apiName,...config });
  

  deleteCortesiasBorrador = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/descuentos/cortesias-borrador/${funcionId}`,
    },
    { apiName: this.apiName,...config });
  

  downloadCuponesByNombre = (nombre: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoSimpleDto[]>({
      method: 'POST',
      url: '/api/app/descuentos/download-cupones',
      params: { nombre },
    },
    { apiName: this.apiName,...config });
  

  generarCuponesIndividualesByInput = (input: InputCuponesIndividualesDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoSimpleDto[]>({
      method: 'POST',
      url: '/api/app/descuentos/generar-cupones-individuales',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  get = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoDto>({
      method: 'GET',
      url: `/api/app/descuentos/${id}`,
    },
    { apiName: this.apiName,...config });
  

  getCortesiasBySectorId = (sectorIds: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, CortesiaSectoresIdDto[]>({
      method: 'GET',
      url: '/api/app/descuentos/cortesias-by-sector-id',
      params: { sectorIds },
    },
    { apiName: this.apiName,...config });
  

  getCortesiasDto = (cortesiaId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CortesiaDto>({
      method: 'GET',
      url: `/api/app/descuentos/cortesias-dto/${cortesiaId}`,
    },
    { apiName: this.apiName,...config });
  

  getDescuentoInfo = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoDto[]>({
      method: 'GET',
      url: `/api/app/descuentos/descuento-info/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getDescuentosByEventoId = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoDto[]>({
      method: 'GET',
      url: `/api/app/descuentos/descuentos/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getDescuentosByNombre = (nombre: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoSimpleDto[]>({
      method: 'GET',
      url: '/api/app/descuentos/descuentos',
      params: { nombre },
    },
    { apiName: this.apiName,...config });
  

  getList = (input: PagedAndSortedResultRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<DescuentoDto>>({
      method: 'GET',
      url: '/api/app/descuentos',
      params: { sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getUserManualByEmail = (email: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto>({
      method: 'GET',
      url: '/api/app/descuentos/user-manual',
      params: { email },
    },
    { apiName: this.apiName,...config });
  

  getUsersExcelByEmails = (emails: string[], config?: Partial<Rest.Config>) =>
    this.restService.request<any, UsuarioDto[]>({
      method: 'GET',
      url: '/api/app/descuentos/users-excel',
      params: { emails },
    },
    { apiName: this.apiName,...config });
  

  obtenerDescuento = (funcionId: string, UserId: string, CodigoDescuento: string, compraId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoDto>({
      method: 'POST',
      url: '/api/app/descuentos/obtener-descuento',
      params: { funcionId, userId: UserId, codigoDescuento: CodigoDescuento, compraId },
    },
    { apiName: this.apiName,...config });
  

  sendCortesias = (dto: SendCortesiasDto, funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DtoReturnError>({
      method: 'POST',
      url: `/api/app/descuentos/send-cortesias/${funcionId}`,
      body: dto,
    },
    { apiName: this.apiName,...config });
  

  update = (id: string, input: DescuentoDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, DescuentoDto>({
      method: 'PUT',
      url: `/api/app/descuentos/${id}`,
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
