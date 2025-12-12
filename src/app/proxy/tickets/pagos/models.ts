import type { FullAuditedEntityDto } from '@abp/ng.core';
import type { Entidad } from '../entidades-externas/entidad.enum';

export interface MetodosPago {
  mercadoPago: boolean;
  macroClick: boolean;
  openpayAr: boolean;
  plusPagos: boolean;
}

export interface MercadoPagoTransient_WebhookRequest {
  type?: string;
  topic?: string;
  id?: string;
  data: MercadoPagoTransient_WebhookRequest_Data;
}

export interface MercadoPagoTransient_WebhookRequest_Data {
  id?: string;
}

export interface ProductoDto {
  entrada?: string;
  precio?: string;
}

export interface SolicitudPagoDto extends FullAuditedEntityDto<string> {
  callbackSuccess?: string;
  callbackCancel?: string;
  comercio?: string;
  sucursalComercio?: string;
  transaccionComercioId?: string;
  monto?: string;
  productosDto: ProductoDto[];
  hash?: string;
  entidad: Entidad;
  solicitudPagoId?: string;
  pagadaGratis: boolean;
  cultureInfo?: string;
  usuarioId?: string;
  referenciaExterna?: string;
  compraId?: string;
  entidadExternaId?: string;
  urlPost?: string;
  timeZoneName?: string;
}
