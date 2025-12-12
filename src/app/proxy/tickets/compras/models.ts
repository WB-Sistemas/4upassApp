import type { EntradaSimplificadaDto } from '../entradas/models';
import type { SectorAgrupadoDto } from '../establecimientos/models';
import type { DescuentoDto } from '../descuentos/models';

export interface GetLiquidacionDto {
  eventoId?: string;
  funcionId?: string;
}

export interface DatosCompraDto {
  evento: EventoConFechaDeFuncionDto;
  entradas: EntradaSimplificadaDto[];
  sectoresAgrupados: SectorAgrupadoDto[];
  usuarioId?: string;
  descuento: DescuentoDto;
}

export interface EstadisticaDto {
  label?: string;
  value: number;
  esDinero: boolean;
}

export interface EventoConFechaDeFuncionDto {
  funcionId?: string;
  nombre?: string;
  esCodigoAcceso: boolean;
  tieneDescuentos: boolean;
  funciones: string[];
  servicio: number;
}

export interface LiquidacionDto {
  liquidaciones: LiquidacionItemDto[];
  totalSinCortesias: number;
  escaneadas: number;
  montoTotal: number;
  totalCortesias: number;
  totalConCortesias: number;
  cortesiasEnviadas: number;
  cortesiasAceptadas: number;
  codigosAccesosEnviados: number;
  tieneCodigoAcceso: boolean;
  tieneCortesia: boolean;
  tieneVentaDirecta: boolean;
  totalVendidasVentaDirecta: number;
  montoTotalVentaDirecta: number;
  comisionVentaDirecta: number;
  liquidacionTotalVentaDirecta: number;
  esVentaDirecta: boolean;
  totalDisponibleParaVenta: number;
  servicio: number;
  anticipos: number;
  estadisticas: EstadisticaDto[];
  porcentajeComisionVentaDirecta: number;
}

export interface LiquidacionItemDto {
  nombrePrecio?: string;
  nombreSector?: string;
  cantidad: number;
  monto: number;
  totalIngresado: number;
  esVentaDirecta: boolean;
  cantidadPack: number;
  esDinero: boolean;
}

export interface SetAnticipoDto {
  eventoId?: string;
  funcionId?: string;
  monto: number;
}
