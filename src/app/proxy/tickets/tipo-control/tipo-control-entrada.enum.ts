import { mapEnumToOptions } from '@abp/ng.core';

export enum TipoControlEntrada {
  Sector = 1,
  Precio = 2,
  SectorPrecio = 3,
  Todas = 4,
}

export const tipoControlEntradaOptions = mapEnumToOptions(TipoControlEntrada);
