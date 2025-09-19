import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { TipoDocs } from '../../usuario/tipo-docs.enum';
import type { EstablecimientoDto, SectorDto } from '../establecimientos/models';
import type { EstadoEvento } from '../../estado-evento.enum';
import type { RRPPUserDto } from '../../models';

export interface CountSubRRPPDto {
  eventoIds: string[];
  rrppUserId?: string;
}

export interface CreateUpdateRRPPDto extends EntityDto {
  nombreUsuario?: string;
  dni?: string;
  tipoDocumento: TipoDocs;
  email?: string;
  telefono?: string;
  eventos: string[];
}

export interface EventosRRPPDto extends EntityDto<string> {
  creatorId?: string;
  nombre?: string;
  ubicacion?: string;
  fechaEfectiva?: string;
  establecimiento: EstablecimientoDto;
  nombreEvento?: string;
  nombreFiltro?: string;
  cortesiaTransferible?: number;
  ventaDirecta?: number;
  totalVendidos?: number;
  totalVendidosCortesia?: number;
  totalVendidosVentaDirecta?: number;
  estado?: EstadoEvento;
  sectores: SectorDto[];
  esVentaDirecta?: boolean;
  esReferido?: boolean;
  tieneSubRRPPs: boolean;
  rrppId?: string;
}

export interface GetEventosRRPPFilterDto extends PagedAndSortedResultRequestDto {
  nombreEvento?: string;
  totalVendidos?: string;
  cortesiaTransferible?: string;
  ventaDirecta?: string;
  search?: string;
}

export interface GetRRPPListFilterDto extends PagedAndSortedResultRequestDto {
  nombreUsuario?: string;
  name?: string;
  dni?: string;
  email?: string;
  telefono?: string;
}

export interface GetSubRRPPFromOneEventoOfRRPPDto extends EntityDto<string> {
  nombreApellido?: string;
  totalVendidosLink?: number;
  totalEnviadasVentaDirecta?: number;
  totalEnviadasCortesia?: number;
  totalVendidosCortesia?: number;
  totalVendidosVentaDirecta?: number;
  numEntradas?: number;
  eventoId?: string;
  parentId?: string;
  nombreFiltro?: string;
}

export interface GetSubRRPPFromOneEventoOfRRPPFilterDto extends PagedAndSortedResultRequestDto {
  nombreApellido?: string;
  totalVendidos?: string;
  search?: string;
  eventoId?: string;
}

export interface InsertRRPPToVentaDirectaDto {
  rrpps: RRPPUserDto[];
  eventoId?: string;
  funcionId?: string;
  sectorId?: string;
  precioId?: string;
  venta: number;
  cortesia: number;
}

export interface RelacionesPublicasDto extends EntityDto<string> {
  clienteId?: string;
  nombreUsuario?: string;
  dni?: string;
  tipoDocumento: TipoDocs;
  email?: string;
  telefono?: string;
  userId?: string;
}

export interface RrppAutocompleteDto {
  email?: string;
  nombre?: string;
}

export interface UpdateRRPPInputDto extends EntityDto<string> {
  nombreUsuario?: string;
  dni?: string;
  telefono?: string;
}
