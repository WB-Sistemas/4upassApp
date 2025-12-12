import { mapEnumToOptions } from '@abp/ng.core';

export enum EmailVerificationStatus {
  Valido = 1,
  NoExiste = 2,
  Lleno = 3,
  Desactivado = 4,
  Error = 5,
}

export const emailVerificationStatusOptions = mapEnumToOptions(EmailVerificationStatus);
