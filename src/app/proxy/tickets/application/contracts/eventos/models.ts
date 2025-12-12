import type { EntityDto } from '@abp/ng.core';

export interface ComisionesParamDto {
  ventaDirectaPct: number;
  ventaOnlinePct: number;
}

export interface CortesiaParamDto {
  mostrarPrecio: boolean;
  mostrarDatosPersonales: boolean;
  mostrarFecha: boolean;
}

export interface EventosActivosInputDto {
  search?: string;
}

export interface EventosParamDto extends EntityDto<string> {
  nombreEvento?: string;
  comisiones: ComisionesParamDto;
  cortesia: CortesiaParamDto;
  metodosPago: MetodosPagoParamDto;
  funciones: FuncionesParamDto[];
}

export interface FuncionesParamDto extends EntityDto<string> {
  desde?: string;
  hasta?: string;
  estado: number;
  estadoLabel?: string;
}

export interface GetEventosActivosDropdownDto extends EntityDto<string> {
  nombre?: string;
  fechaProxima?: string;
}

export interface MetodosPagoParamDto {
  macroClick: boolean;
  mercadoPago: boolean;
  openpayAr: boolean;
  plusPagos: boolean;
}

export interface PutComisionesParamDto {
  ventaDirectaPct: number;
  ventaOnlinePct: number;
}

export interface PutCortesiaParamDto {
  mostrarPrecio: boolean;
  mostrarDatosPersonales: boolean;
  mostrarFecha: boolean;
}

export interface PutFuncionesParamDto extends EntityDto<string> {
  desde?: string;
  hasta?: string;
  estado: number;
  timeZoneName?: string;
}

export interface PutMetodoDePagoDto {
  macroClick: boolean;
  mercadoPago: boolean;
  openpayAr: boolean;
  plusPagos: boolean;
}
