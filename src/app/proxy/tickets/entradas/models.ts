import type { EntityDto, FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { EstadoCompra } from './estado-compra.enum';
import type { IdentityUserDto } from '../../volo/abp/identity/models';
import type { TipoDocs } from '../../usuario/tipo-docs.enum';
import type { TipoEntrada } from './tipo-entrada.enum';
import type { FuncionDto } from '../eventos/models';
import type { PrecioDto } from '../precios/models';
import type { FilaNoTrackDto } from '../establecimientos/models';
import type { Entidad } from '../entidades-externas/entidad.enum';

export interface AsientosForETicketsDto {
  id?: string;
  num?: string;
  numeroMostrar?: string;
  ocupado: boolean;
}

export interface BuscarTicketQRResult {
  entradaSimpleDto: EntradaSimpleDto;
  returnDataErrors: ReturnDataErrors;
}

export interface CompraDto extends FullAuditedEntityDto<string> {
  numEntradas: number;
  name?: string;
  estado: EstadoCompra;
  usuarioId?: string;
  usuario: IdentityUserDto;
  numeroDNI?: string;
  tipoIdentificacion: TipoDocs;
  entradas: EntradasCombinadasDto[];
}

export interface DatoCompraDto {
  name?: string;
  phone?: string;
  email?: string;
  tipoIdentificacion: TipoDocs;
  numeroDNI?: string;
}

export interface DatosUsuario {
  name?: string;
  surname?: string;
  tipoIdentificacion: TipoDocs;
  numeroDNI?: string;
}

export interface ETicketsDto {
  eventoId?: string;
  textoVisualETickets?: string;
  entradas: EntradasCombinadasDto[];
}

export interface EntradaSimpleDto {
  name?: string;
  surname?: string;
  idLegible?: string;
  tipoIdentificacion: TipoDocs;
  numeroDNI?: string;
  fecha?: string;
  nombre?: string;
  nombreSector?: string;
  used?: boolean;
  idRef?: string;
  email?: string;
  nombreFila?: string;
  nombreAsiento?: string;
}

export interface EntradasCombinadasDto extends EntradasDto {
  sectorId?: string;
  asientoId?: string;
  fila: FilaForEticketsDto;
  sectores: SectoresForETicketsDto;
  asientos: AsientosForETicketsDto;
  nombreEvento?: string;
  fecha?: string;
  datosUsuario: DatosUsuario;
  idLegible?: string;
  qrCode?: string;
  isEditing: boolean;
  idReferencia?: string;
  monto: number;
  cortesia: boolean;
  cortesiaConPrecio: boolean;
  compartidoWhatsapp: boolean;
  linkDescargarEntradas?: string;
  urlReemplazar?: string;
}

export interface EntradasDto extends FullAuditedEntityDto<string> {
  idLegible?: string;
  name?: string;
  numeroDNI?: string;
  tipoIdentificacion?: TipoDocs;
  monto: number;
  tipo: TipoEntrada;
  funcionId?: string;
  funcion: FuncionDto;
  precioId?: string;
  precio: PrecioDto;
  compraId?: string;
  compra: CompraDto;
  datoExtra?: string;
}

export interface EntradasGetDto {
  fila: FilaNoTrackDto;
  entradas: EntradasNoTrackDto[];
}

export interface EntradasNoTrackDto extends FullAuditedEntityDto<string> {
  idLegible?: string;
  asientoId?: string;
  funcionId?: string;
  detalleCompraId?: string;
}

export interface FilaForEticketsDto {
  filaId?: string;
  nombre?: string;
  orden: number;
}

export interface FinalizarCompraDto extends FullAuditedEntityDto<string> {
  compraId?: string;
  descuentoId?: string;
  entidad: Entidad;
  timeZoneName?: string;
  hashConfirmacion?: string;
  eventoId?: string;
  solicitudPagoId?: string;
  paymentId?: string;
}

export interface IniciarCompraDto {
  funcionId?: string;
  listaEntradaDto: ItemCompraDto[];
  referidoId?: string;
  codigosAccesos: string[];
}

export interface ItemCompraDto {
  sectorId?: string;
  nombreSector?: string;
  entradasNumeradas: string[];
  cantidad: number;
  precioId?: string;
}

export interface ReporteVentasDto extends EntityDto<string> {
  nombreComprador?: string;
  apellidoComprador?: string;
  fechaFuncion?: string;
  nombreSector?: string;
  nombrePrecio?: string;
  fechaCompra?: string;
  cantidadEntradas: number;
  nroOrden: number;
  idLegible?: string;
  nombreRrpp?: string;
  metodoPago?: string;
  estadoCompra: EstadoCompra;
  estadoScan: boolean;
  fechaScan?: string;
  valorTotal: number;
  funciones: object;
  email?: string;
  telefono?: string;
  numeroFactura?: string;
  fechaFactura?: string;
  provincia?: string;
}

export interface ReporteVentasRequestDto extends PagedAndSortedResultRequestDto {
  eventoId?: string;
  rrppIds: string[];
  desde?: string;
  hasta?: string;
  timezoneName?: string;
  filtroGlobal?: string;
  funcionDropdown?: string;
  sectorDropdown?: string;
  rrpPsDropdown?: string;
  tipoPrecioDropdown?: string;
  metodoPagoDropdown?: string;
}

export interface ReturnDataErrors {
  scanTime?: string;
  nameScanBy?: string;
  expiredDate?: string;
  nombreSector?: string;
  nombreSeccion?: string;
  subtitle?: string;
}

export interface SectoresForETicketsDto {
  id?: string;
  nombre?: string;
  precio?: number;
  guiaMapa?: string;
  establecimientoId?: string;
  descripcion?: string;
  orden: number;
}

export interface UpdateDatosUsuarioForETickets {
  name?: string;
  surname?: string;
  tipoIdentificacion: TipoDocs;
  numeroDNI?: string;
}

export interface EntradaSimplificadaDto {
  monto: number;
  nombreSector?: string;
  nombrePrecio?: string;
  compraId?: string;
}
