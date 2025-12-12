import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { EstadoPrecio } from '../../estado-precio.enum';
import type { SectorDto, SectorNoTrackDto } from '../establecimientos/models';
import type { FuncionDto } from '../eventos/models';
import type { DescuentoDto } from '../descuentos/models';
import type { EstadoTemplateEstab } from '../../estado-template-estab.enum';

export interface FuncionPrecio {
  funcionId?: string;
  precioId?: string;
  vendidas: number;
}

export interface PrecioDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  estado: EstadoPrecio;
  seMantieneTodoElEvento: boolean;
  fechaEfectiva?: string;
  fechaHasta?: string;
  horaEntradaVigencia?: string;
  cantidad?: number;
  cantidadEntradas: number;
  chequeado: boolean;
  agregarHoraLimite?: boolean;
  monto: number;
  sectorId?: string;
  sector: SectorDto;
  funcion: FuncionDto;
  funcionId?: string;
  groupId: number;
  fechaHoraLimite?: string;
  horaLimite?: string;
  descripcion?: string;
}

export interface PrecioFiltroDto {
  nombre?: string;
  groupId: number;
  sectoresIds: string[];
}

export interface PrecioNoTrackDto extends FullAuditedEntityDto<string> {
  funcionId?: string;
  nombre?: string;
  grupo: number;
  fechaEfectiva?: string;
  monto: number;
  chequeado: boolean;
  sector: SectorNoTrackDto;
  sectorId?: string;
  disponible: boolean;
  cantidad: number;
  cantidadEntradas: number;
  entradas: number;
  espacioDisponible: number;
  agotado: boolean;
  descripcion?: string;
}

export interface PrecioPer {
  nombre?: string;
  estado: EstadoPrecio;
  seMantieneTodoElEvento: boolean;
  fechaEfectiva?: string;
  fechaHasta?: string;
  horaEntradaVigencia?: string;
  chequeado: boolean;
  groupId: number;
  funcionesId: string[];
  sectoresMonto: SectorMonto[];
  monto?: number;
  descripcion?: string;
}

export interface PreciosDescuentos {
  precios: PrecioPer[];
  descuentos: DescuentoDto[];
  compraMaxUser: number;
  minutosCompra: number;
  template: EstadoTemplateEstab;
}

export interface SectorDePrecioSeleccionadoDto extends EntityDto<string> {
  nombre?: string;
  cantidad: number;
  cantidadEntradas: number;
  precioId?: string;
  cortesias?: number;
  ventas?: number;
}

export interface SectorMonto {
  sectorId?: string;
  nombre?: string;
  monto: number;
  sectorAnulado: boolean;
  orden: number;
  funcionId?: string;
  cantidad: number;
  cantidadEntradas: number;
  chequeado: boolean;
  capacidad: number;
  agregarHoraLimite?: boolean;
  fechaHoraLimite?: string;
  horaLimite?: string;
  funcionPrecioId: FuncionPrecio[];
}

export interface TipoPrecioYSectoresDto {
  nombreTipoPrecio?: string;
  sectores: SectorDePrecioSeleccionadoDto[];
}
