import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface DatosSubRRPP {
  nombreSubRRPP?: string;
  cortesiaTransferible?: number;
  ventasDirectasCargadas?: number;
  totalVendidosLink?: number;
  totalRecaudadoLink?: number;
  cortesiasEnviadas?: number;
  ventaDirecta?: number;
  totalRecaudadoVentaDirecta?: number;
}

export interface GetAllVentasRRPPDto extends EntityDto<string> {
  userId?: string;
  nombreRRPP?: string;
  cortesiaTransferible?: number;
  ventasDirectasCargadas?: number;
  totalVendidosLink?: number;
  totalRecaudadoLink?: number;
  cortesiasEnviadas?: number;
  totalRecaudadoVentaDirecta?: number;
  subRRPPs: DatosSubRRPP[];
  ventaDirecta?: number;
  identificadorString?: string;
  asignadoEvento: boolean;
}

export interface GetVentasRRPPAndSubRRPPDto extends PagedAndSortedResultRequestDto {
  eventoId?: string;
  funcionId?: string;
  search?: string;
}

export interface ReporteVentasExcelDto {
  nombreEvento?: string;
  fechaEvento?: string;
  excelFile: number[];
}
