import { mapEnumToOptions } from '@abp/ng.core';

export enum EstadoTemplateEstab {
  NoEsTemplate = 0,
  EsTemplate = 1,
  EsHijoTemplate = 2,
}

export const estadoTemplateEstabOptions = mapEnumToOptions(EstadoTemplateEstab);
