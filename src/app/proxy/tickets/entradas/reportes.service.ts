import type { ReporteVentasRequestDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ReporteGeneralExcelDto } from '../application/contracts/reporte-eventos-ventas/models';
import type { CantidadEntradasVendidasPorUsuarioDto, FlujoCompraDto, FuncionEntradasDto, FuncionesReportesReturnDto, GetExcelLiquidacionDto, HistoricoVentasDto, SectorGraficoDto, TipoEntradaGraficoDto, TotalEntradasDto, VentaPromedioDto } from '../../models';
import type { ReporteGeneralFiltersDto } from '../reporte-eventos-ventas/models';
import type { GetAllVentasRRPPDto, GetVentasRRPPAndSubRRPPDto, ReporteVentasExcelDto } from '../reportes/models';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  apiName = 'Default';
  

  getAllVentasOfRRPPAndSubRRPP = (dto: GetVentasRRPPAndSubRRPPDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllVentasRRPPDto>>({
      method: 'GET',
      url: '/api/app/reportes/ventas-of-rRPPAnd-sub-rRPP',
      params: { eventoId: dto.eventoId, funcionId: dto.funcionId, search: dto.search, sorting: dto.sorting, skipCount: dto.skipCount, maxResultCount: dto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getCantMaxEntradasVendidasPorUsuario = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CantidadEntradasVendidasPorUsuarioDto[]>({
      method: 'GET',
      url: `/api/app/reportes/cant-max-entradas-vendidas-por-usuario/${funcionId}`,
    },
    { apiName: this.apiName,...config });
  

  getEntradasVendidas = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionEntradasDto>({
      method: 'GET',
      url: `/api/app/reportes/entradas-vendidas/${funcionId}`,
    },
    { apiName: this.apiName,...config });
  

  getExcel = (input: ReporteVentasRequestDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReporteVentasExcelDto>({
      method: 'GET',
      url: '/api/app/reportes/excel',
      params: { eventoId: input.eventoId, rrppId: input.rrppId, desde: input.desde, hasta: input.hasta, timezoneName: input.timezoneName, filtroGlobal: input.filtroGlobal, funcionDropdown: input.funcionDropdown, sectorDropdown: input.sectorDropdown, rrpPsDropdown: input.rrpPsDropdown, tipoPrecioDropdown: input.tipoPrecioDropdown, metodoPagoDropdown: input.metodoPagoDropdown, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getExcelLiquidacion = (input: GetExcelLiquidacionDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, number[]>({
      method: 'GET',
      url: '/api/app/reportes/excel-liquidacion',
      params: { ["EventoId.Id"]: input.eventoId.id, ["Liquidacion.EventoId"]: input.liquidacion.eventoId, ["Liquidacion.FuncionId"]: input.liquidacion.funcionId },
    },
    { apiName: this.apiName,...config });
  

  getExcelReporteGeneralizado = (input: ReporteGeneralFiltersDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReporteGeneralExcelDto>({
      method: 'GET',
      url: '/api/app/reportes/excel-reporte-generalizado',
      params: { pais: input.pais, provincia: input.provincia, ciudad: input.ciudad, estadoFuncion: input.estadoFuncion, desde: input.desde, hasta: input.hasta, search: input.search, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getExcelVentasRRPP = (dto: GetVentasRRPPAndSubRRPPDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ReporteVentasExcelDto>({
      method: 'GET',
      url: '/api/app/reportes/excel-ventas-rRPP',
      params: { eventoId: dto.eventoId, funcionId: dto.funcionId, search: dto.search, sorting: dto.sorting, skipCount: dto.skipCount, maxResultCount: dto.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getFlujoCompras = (funcionId: string, timezoneName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FlujoCompraDto[]>({
      method: 'GET',
      url: `/api/app/reportes/flujo-compras/${funcionId}`,
      params: { timezoneName },
    },
    { apiName: this.apiName,...config });
  

  getFuncionesByEventoId = (eventoId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, FuncionesReportesReturnDto>({
      method: 'GET',
      url: `/api/app/reportes/funciones/${eventoId}`,
    },
    { apiName: this.apiName,...config });
  

  getHistoricoVentas = (funcionId: string, mes: string, timezoneName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HistoricoVentasDto[]>({
      method: 'GET',
      url: `/api/app/reportes/historico-ventas/${funcionId}`,
      params: { mes, timezoneName },
    },
    { apiName: this.apiName,...config });
  

  getSectorGrafico = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SectorGraficoDto[]>({
      method: 'GET',
      url: `/api/app/reportes/sector-grafico/${funcionId}`,
    },
    { apiName: this.apiName,...config });
  

  getTipoEntradaGrafico = (funcionId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TipoEntradaGraficoDto[]>({
      method: 'GET',
      url: `/api/app/reportes/tipo-entrada-grafico/${funcionId}`,
    },
    { apiName: this.apiName,...config });
  

  getTotalEntradasEscaneadas = (funcionId: string, eventoId: string, seccion?: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TotalEntradasDto>({
      method: 'GET',
      url: '/api/app/reportes/total-entradas-escaneadas',
      params: { funcionId, eventoId, seccion },
    },
    { apiName: this.apiName,...config });
  

  getVentaPromedio = (eventoId: string, funcionId: string, mes: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, VentaPromedioDto[]>({
      method: 'GET',
      url: '/api/app/reportes/venta-promedio',
      params: { eventoId, funcionId, mes },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
