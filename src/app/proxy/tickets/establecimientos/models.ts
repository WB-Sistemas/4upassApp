import type { EntityDto, FullAuditedEntityDto } from '@abp/ng.core';
import type { TipoSector } from './tipo-sector.enum';
import type { PrecioDto, PrecioNoTrackDto, PrecioPer } from '../precios/models';
import type { EventoDto } from '../eventos/models';
import type { ArchivoDto } from '../archivos/models';
import type { TipoArchivo } from '../../tipo-archivo.enum';
import type { EstadoTemplateEstab } from '../../estado-template-estab.enum';

export interface AsientosDto extends FullAuditedEntityDto<string> {
  num?: string;
  ocupado: boolean;
  numeroMostrar?: string;
}

export interface CreateFilaDto {
  nombre?: string;
  asientos: AsientosDto[];
  anulada: boolean;
  orden: number;
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
  grupo?: number;
  filas: CreateFilaDto[];
}

export interface EstablecimientoDropDto extends EntityDto<string> {
  nombre?: string;
  nombreEvento?: string;
}

export interface EstablecimientoDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  idProvincia?: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  lugar?: string;
  lugarManual: boolean;
  ubicacion?: string;
  eventos: EventoDto[];
  sectores: SectorDto[];
}

export interface EstablecimientoNoTrackDto {
  id?: string;
  nombre?: string;
  nombreNormalizado?: string;
  idPais?: string;
  idProvincia?: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  lugar?: string;
  lugarManual: boolean;
  ubicacion?: string;
  imgEstabId?: string;
  imagenEstab: ArchivoDto;
  urlYoutube?: string;
  urlSpotify?: string;
  tipoArchivo: TipoArchivo;
  template: EstadoTemplateEstab;
  sectorGeneral: SectorNoTrackGeneralDto[];
  sectorNumerado: SectorNoTrackNumeradoDto[];
}

export interface FilaNoTrackDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  asientos: AsientosDto[];
  sectorId?: string;
  asientosDisponibles: number;
  orden: number;
}

export interface SectorDto extends FullAuditedEntityDto<string> {
  nombre?: string;
  guiaMapa?: string;
  tipo: TipoSector;
  descripcion?: string;
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
  grupo?: number;
  nombreGrupo?: string;
}

export interface SectorNoTrackGeneralDto extends SectorNoTrackDto {
  capacidad: number;
  descripcion?: string;
  cantEntr: number;
  entradasDisponibles: number;
}

export interface SectorNoTrackNumeradoDto extends SectorNoTrackDto {
  numFilas: number;
  capacidad: number;
  cantMax?: number;
  sectorId?: string;
  precioId?: string;
  filas: FilaNoTrackDto[];
  entradasDisponibles: number;
  pocasEntradasSectorNum: boolean;
  sinEntradasSectorNum: boolean;
}

export interface UpdateEstabDto extends EntityDto<string> {
  tipoArchivo: TipoArchivo;
  urlYoutube?: string;
  urlSpotify?: string;
  imgEstabId?: string;
  nombre?: string;
  idPais?: string;
  idProvincia?: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  lugar?: string;
  lugarManual: boolean;
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

export interface ErroresAsientoDto {
  errores: ErroresAsientoDto_ErrorAsientoDto[];
}

export interface ErroresAsientoDto_ErrorAsientoDto {
  asientoId?: string;
  nombre?: string;
}

export interface GetSectoresDto extends EntityDto<string> {
  nombre?: string;
}

export interface SectorAgrupadoDto {
  nombre?: string;
  nombrePrecio?: string;
  cantidad: number;
  cantidadEntradas: number;
  cantidadPack: number;
  precioOriginal: number;
  precioTotal: number;
  detalleAsientos: string[];
}
