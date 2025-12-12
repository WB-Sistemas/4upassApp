import type { FullAuditedEntityDto } from '@abp/ng.core';
import type { TipoDescuento } from './tipo-descuento.enum';
import type { FormaDescuento } from './forma-descuento.enum';
import type { PrecioDto } from '../precios/models';

export interface DescuentoDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  fechaDesde?: string;
  fechaHasta?: string;
  tipo: TipoDescuento;
  forma: FormaDescuento;
  usado?: boolean;
  cantidadUsos?: number;
  usados?: number;
  usuarioId?: string;
  porcentaje?: number;
  pagares?: number;
  codigo?: string;
  funcionId?: string;
  funcionesId: string[];
  valido: boolean;
  explicacionError?: string;
  cantidadEsInfo?: number;
  modificado?: boolean;
  eliminado?: boolean;
  groupId?: string;
  sectorId?: string;
}

export interface CortesiaCreatedDto {
  id?: string;
  linkDescargarEntradas?: string;
}

export interface CortesiaDto {
  funcionId?: string;
  cantidadPorPersona: number;
  archivo?: string;
  nombre?: string;
  email?: string;
}

export interface CreateDescuentoPrecio {
  descuentos: DescuentoDto[];
  precios: PrecioDto[];
  compraMaxUser: number;
  minutosCompra: number;
}
