import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { TipoLiquidacion } from './tickets/eventos-datos-bancarios/tipo-liquidacion.enum';
import type { TipoInvitacion } from './tipo-invitacion.enum';
import type { EstadoCortesia } from './estado-cortesia.enum';
import type { EstadoFuncion } from './estado-funcion.enum';
import type { TipoCuenta } from './tipo-cuenta.enum';
import type { GetIdDto } from './tickets/models';
import type { GetLiquidacionDto } from './tickets/compras/models';
import type { FormaDescuento } from './tickets/descuentos/forma-descuento.enum';

export interface RRPPUserDto {
  id?: string;
  userId?: string;
  name?: string;
}

export interface SeguridadUserDto {
  id?: string;
  name?: string;
}

export interface AddDatosBancariosEventosDto extends EntityDto {
  eventoId?: string;
  funcionId?: string;
  datosBancariosId?: string;
  tipoLiquidacion: TipoLiquidacion;
  valorLiquidacion: number;
  monto: number;
}

export interface AsignacionRRPPEventoDto {
  rrppIds: string[];
  eventos: string[];
}

export interface AsignacionSeguridadEventoDto {
  usuarios: string[];
  eventos: string[];
}

export interface CantidadEntradasVendidasPorUsuarioDto {
  cantidadCompradas: number;
  cantidadDeUsuarios: number;
}

export interface CarrouselDto {
  eventoId?: string;
  tiempoFrente: number;
}

export interface CortesiaArchivoDto {
  funcionId?: string;
  sectorId?: string;
  rrppId?: string;
  ventaDirectaId?: string;
  precioId?: string;
  tipo: TipoInvitacion;
  cantidad: number;
  nombre?: string;
  email?: string;
  normalizedEmail?: string;
  estado: EstadoCortesia;
}

export interface CortesiaInputDto extends PagedAndSortedResultRequestDto {
  nombre?: string;
  email?: string;
  dni?: string;
  telefono?: string;
  funcionId?: string;
}

export interface Dato {
  fechaFuncion?: string;
  cantidad: number;
}

export interface DescuentoSimpleDto {
  nombre?: string;
  codigo?: string;
}

export interface EventoConFuncionesDto {
  eventoId?: string;
  nombre?: string;
  funcionId?: string;
  fecha?: string;
  estado?: EstadoFuncion;
  esCodigoAcceso: boolean;
  codigosEnviados: number;
}

export interface EventosAsignadosDto extends EntityDto<string> {
  nombre?: string;
  fecha?: string;
  ubicacion?: string;
}

export interface FlujoCompraDto {
  hora: number;
  totalEntradasVendidas: number;
}

export interface FuncionEntradasDto {
  entradasTotal: number;
  entradasVendidas: number;
}

export interface FuncionesReportesDto extends EntityDto<string> {
  fecha?: string;
}

export interface FuncionesReportesReturnDto {
  nombreEvento?: string;
  funciones: FuncionesReportesDto[];
}

export interface GetDatosBancariosEventosDto extends EntityDto {
  datoBancarioId?: string;
  eventoId?: string;
  funcionId?: string;
  datosBancariosId?: string;
  tipoLiquidacion: TipoLiquidacion;
  valorLiquidacion: number;
  monto: number;
  nombreArchivo?: string;
  archivoId?: string;
  titular?: string;
  cuit?: string;
  banco?: string;
  tipoDeCuenta: TipoCuenta;
  cbu?: string;
}

export interface GetEventoWithCortesiaDto extends PagedAndSortedResultRequestDto {
  nombreUsuario?: string;
  nombre?: string;
  email?: string;
  sector?: string;
  cantidad?: string;
  fecha?: string;
  estado: EstadoCortesia;
  estadosSeleccionados: EstadoCortesia[];
  tipo: TipoInvitacion[];
  preciosGroups: number[];
  sectores: string[];
  subRRPPs: string[];
}

export interface GetEventosWithCortesiaDto extends PagedAndSortedResultRequestDto {
  nombre?: string;
  fecha?: string;
  search?: string;
  rrppId?: string;
}

export interface GetExcelLiquidacionDto {
  eventoId: GetIdDto;
  liquidacion: GetLiquidacionDto;
}

export interface HistoricoVentasDto {
  dia?: string;
  datos: Dato[];
}

export interface InputCuponesIndividualesDto {
  nombre?: string;
  cantidad: number;
  forma: FormaDescuento;
  fechaDesde?: string;
  fechaHasta?: string;
  porcentaje?: number;
  funciones: string[];
  idPadre?: string;
}

export interface PagedResultWithData<T, Extra> {
  totalCount: number;
  items: T[];
  data: Extra;
}

export interface ReporteDropdownsDto {
  funciones: string[];
  sectores: string[];
  rrpPs: string[];
  metodosPagos: string[];
  tiposPrecios: string[];
  totalSumado: number;
}

export interface SectorGraficoDto {
  id?: string;
  nombreSector?: string;
  cantidad: number;
}

export interface TipoEntradaGraficoDto {
  nombrePrecio?: string;
  cantidad: number;
}

export interface TotalEntradasDto {
  total: number;
  escaneadas: number;
  noEscaneadas: number;
}

export interface UpdateCortesiaInputDto extends EntityDto<string> {
  nombre?: string;
  email?: string;
  dni?: string;
  telefono?: string;
}

export interface VentaPromedioDto {
  nombrePrecio?: string;
  entradasVendidas: number;
  entradasDisponibles: number;
}
