import type { Either } from '../utils/models';
import type { FilaNoTrackDto } from '../establecimientos/models';
import type { EntityDto } from '@abp/ng.core';
import type { TipoSector } from '../establecimientos/tipo-sector.enum';

export interface GetPrecioByFuncionDto {
  nombre?: string;
  descripcion?: string;
  groupId: number;
  final?: string;
  order: number;
  sectores: Either<SectoresEntradasDto, SectorEntradasNumeradoDto>[];
}

export interface SectorEntradasNumeradoDto extends SectoresEntradasDto {
  numFilas: number;
  filas: FilaNoTrackDto[];
  entradasDisponibles: number;
}

export interface SectoresEntradasDto extends EntityDto<string> {
  sectorId?: string;
  nombre?: string;
  descripcion?: string;
  monto: number;
  cantidadEntradas: number;
  cantMax: number;
  cantMaxSector: number;
  groupId: number;
  agotado: boolean;
  tipo: TipoSector;
  grupo: number;
  nombreGrupo?: string;
  capacidad: number;
  orden: number;
}
