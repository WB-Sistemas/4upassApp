import { mapEnumToOptions } from '@abp/ng.core';

export enum Rol {
  Administrador = 1,
  Comprador = 2,
  Cliente = 4,
  Seguridad = 8,
  RRPP = 16,
  SUB_RRPP = 32,
  Auditor = 64,
}

export const rolOptions = mapEnumToOptions(Rol);
