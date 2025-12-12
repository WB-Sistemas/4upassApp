import type { TipoDescuento } from '../../descuentos/tipo-descuento.enum';
import type { FormaDescuento } from '../../descuentos/forma-descuento.enum';
import type { CategoriaEvento } from '../../../categoria-evento.enum';
import type { ArchivoDto } from '../../archivos/models';
import type { TipoArchivo } from '../../../tipo-archivo.enum';
import type { EstadoPrecio } from '../../../estado-precio.enum';
import type { TipoSector } from '../../establecimientos/tipo-sector.enum';

export interface AsientoClonarDto {
  num?: string;
  numeroMostrar?: string;
}

export interface DescuentoClonarDto {
  nombre?: string;
  tipo: TipoDescuento;
  forma: FormaDescuento;
  porcentaje?: number;
  cantidadUsos?: number;
}

export interface EventoClonarDto {
  paso1: Paso1ClonarDto;
  paso2: Paso2ClonarDto;
  paso3: Paso3ClonarDto;
}

export interface FilaClonarDto {
  nombre?: string;
  orden: number;
  anulada: boolean;
  asientos: AsientoClonarDto[];
}

export interface Paso1ClonarDto {
  nombre?: string;
  descripcion?: string;
  observaciones?: string;
  terminos?: string;
  esPrivado: boolean;
  esCodigoAcceso: boolean;
  esMayorEdad: boolean;
  categorias: CategoriaEvento[];
  imagenHome: ArchivoDto;
  imagenBanner: ArchivoDto;
  imagenesDetalle: ArchivoDto[];
  seguridadIds: string[];
  rrppIds: string[];
  boleteriaIds: string[];
}

export interface Paso2ClonarDto {
  nombre?: string;
  idPais?: string;
  idProvincia?: number;
  descProvincia?: string;
  idLocalidad?: string;
  descLocalidad?: string;
  lugar?: string;
  lugarManual: boolean;
  ubicacion?: string;
  urlYoutube?: string;
  urlSpotify?: string;
  tipoArchivo: TipoArchivo;
  imagenEstab: ArchivoDto;
  esTemplate: boolean;
  sectores: SectorClonarDto[];
}

export interface Paso3ClonarDto {
  compraMaxUser: number;
  minutosCompra: number;
  precios: PrecioClonarDto[];
  descuentos: DescuentoClonarDto[];
}

export interface PrecioClonarDto {
  nombre?: string;
  estado: EstadoPrecio;
  seMantieneTodoElEvento: boolean;
  fechaEfectiva?: string;
  fechaHasta?: string;
  horaEntradaVigencia?: string;
  groupId: number;
  descripcion?: string;
  sectoresMonto: SectorMontoClonarDto[];
}

export interface SectorClonarDto {
  nombre?: string;
  tipo: TipoSector;
  capacidad: number;
  descripcion?: string;
  sectorAnulado: boolean;
  orden: number;
  grupo?: number;
  numFilas?: number;
  filas: FilaClonarDto[];
}

export interface SectorMontoClonarDto {
  nombreSector?: string;
  ordenSector: number;
  monto: number;
  cantidad: number;
  cantidadEntradas: number;
  chequeado: boolean;
  agregarHoraLimite?: boolean;
  fechaHoraLimite?: string;
  horaLimite?: string;
}
