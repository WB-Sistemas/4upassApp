import { mapEnumToOptions } from '@abp/ng.core';

export enum EstadoEnvio {
  Pendiente = 0,
  Enviado = 1,
  Cancelado = 2,
  Fallido = 3,
  Queja = 4,
  Excluido = 5,
  RechazadoSoft = 6,
  RechazadoHard = 7,
  NoExiste = 8,
}

export const estadoEnvioOptions = mapEnumToOptions(EstadoEnvio);
