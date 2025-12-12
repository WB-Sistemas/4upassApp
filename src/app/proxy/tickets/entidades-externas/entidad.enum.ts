import { mapEnumToOptions } from '@abp/ng.core';

export enum Entidad {
  Gratuita = 1,
  MacroClick = 2,
  MercadoPago = 4,
  OpenpayAr = 8,
  PlusPagos = 16,
}

export const entidadOptions = mapEnumToOptions(Entidad);
