import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { TipoSector } from './tipo-sector.enum';
import type { PrecioDto, PrecioNoTrackDto, PrecioPer } from '../precios/models';
import type { EventoDto } from '../eventos/models';
import type { ArchivoDto } from '../archivos/models';
import type { TipoArchivo } from '../../tipo-archivo.enum';

export interface AsientosDto extends FullAuditedEntityDto<string> {
  num?: string;
  ocupado: boolean;
}

export interface CreateFilaDto {
  nombre?: string;
  asientos: AsientosDto[];
  anulada: boolean;
}

export interface CreateSectorDto extends EntityDto<string> {
  nombre?: string;
  guiaMapa?: string;
  tipo: TipoSector;
  establecimientoId?: string;
  establecimiento: EstablecimientoDto;
  precios: PrecioDto[];
  sectorAnulado: boolean;
  orden: number;
  capacidad?: number;
  descripcion?: string;
  numFilas?: number;
  filas: CreateFilaDto[];
}

export interface EstablecimientoDropDto extends EntityDto<string> {
  nombre?: string;
  nombreEvento?: string;
}

export interface EstablecimientoDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  idProvincia: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  ubicacion?: string;
  eventos: EventoDto[];
  sectores: SectorDto[];
}

export interface EstablecimientoNoTrackDto {
  id?: string;
  nombre?: string;
  idPais?: string;
  idProvincia: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  ubicacion?: string;
  imgEstabId?: string;
  imagenEstab: ArchivoDto;
  urlYoutube?: string;
  urlSpotify?: string;
  tipoArchivo: TipoArchivo;
  sectorGeneral: SectorNoTrackGeneralDto[];
  sectorNumerado: SectorNoTrackNumeradoDto[];
}

export interface FilaNoTrackDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  asientos: AsientosDto[];
  sectorId?: string;
  asientosDisponibles: number;
}

export interface SectorDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  guiaMapa?: string;
  tipo: TipoSector;
  establecimientoId?: string;
  establecimiento: EstablecimientoDto;
  precios: PrecioDto[];
  sectorAnulado?: boolean;
  orden?: number;
}

export interface SectorNoTrackDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  guiaMapa?: string;
  tipo: TipoSector;
  descripcion?: string;
  establecimientoId?: string;
  establecimiento: EstablecimientoNoTrackDto;
  precios: PrecioNoTrackDto[];
  precio: PrecioNoTrackDto;
  sectorAnulado?: boolean;
  orden?: number;
  agotado?: boolean;
  entradasVendidas?: number;
}

export interface SectorNoTrackGeneralDto extends SectorNoTrackDto {
  capacidad: number;
  descripcion?: string;
  cantEntr: number;
  entradasDisponibles: number;
}

export interface SectorNoTrackNumeradoDto extends SectorNoTrackDto {
  numFilas: number;
  filas: FilaNoTrackDto[];
  entradasDisponibles: number;
}

export interface UpdateEstabDto extends EntityDto<string> {
  tipoArchivo: TipoArchivo;
  urlYoutube?: string;
  urlSpotify?: string;
  imgEstabId?: string;
  nombre?: string;
  idPais?: string;
  idProvincia: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  ubicacion?: string;
  sectores: UpdtSectorDto[];
}

export interface UpdtSectorDto extends EntityDto<string> {
  nombre?: string;
  guiaMapa?: string;
  tipo: TipoSector;
  establecimientoId?: string;
  establecimiento: EstablecimientoDto;
  precios: PrecioDto[];
  preciosConFunciones: PrecioPer[];
  sectorAnulado: boolean;
  orden: number;
  capacidad?: number;
  descripcion?: string;
  numFilas?: number;
  filas: CreateFilaDto[];
}

export interface SectorAgrupadoDto {
  nombre?: string;
  nombrePrecio?: string;
  cantidad: number;
  cantidadEntradas: number;
  cantidadPack: number;
  precioOriginal: number;
  precioTotal: number;
}
