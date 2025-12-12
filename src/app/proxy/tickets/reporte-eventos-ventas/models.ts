import type { EstadoFuncionOptionDto } from '../application/contracts/reporte-eventos-ventas/models';
import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { EstadoFuncion } from '../../estado-funcion.enum';

export interface IdNombreDto {
  id?: string;
  nombre?: string;
}

export interface ReporteGeneralDropdownsDto {
  paises: IdNombreDto[];
  provincias: IdNombreDto[];
  ciudades: IdNombreDto[];
  estadosFuncion: EstadoFuncionOptionDto[];
  totales: ReporteGeneralTotalesDto;
}

export interface ReporteGeneralFiltersDto extends PagedAndSortedResultRequestDto {
  pais?: string;
  provincia?: string;
  ciudad?: string;
  estadoFuncion?: EstadoFuncion;
  desde?: string;
  hasta?: string;
  search?: string;
}

export interface ReporteGeneralRowDto extends EntityDto<string> {
  eventoId?: string;
  nombreEvento?: string;
  fechaFuncion?: string;
  pais?: string;
  provincia?: string;
  ciudad?: string;
  totalOnline: number;
  comisionOnline: number;
  totalDirecta: number;
  comisionDirecta: number;
  anticipos: number;
  totalALiquidar: number;
  totalMercadoPago: number;
  totalMacroDebito: number;
  totalMacroCredito: number;
  totalOpenpay: number;
  cantEntradasOnline: number;
  cantEntradasDirecta: number;
  cantOperaciones: number;
}

export interface ReporteGeneralTotalesDto {
  totalOnline: number;
  comisionOnline: number;
  totalDirecta: number;
  comisionDirecta: number;
  anticipos: number;
  totalALiquidar: number;
  totalMercadoPago: number;
  totalMacroDebito: number;
  totalMacroCredito: number;
  totalOpenpay: number;
  cantEntradasOnline: number;
  cantEntradasDirecta: number;
  cantOperaciones: number;
}
