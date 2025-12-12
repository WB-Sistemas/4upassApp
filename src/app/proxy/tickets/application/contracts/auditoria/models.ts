import type { EntityDto } from '@abp/ng.core';

export interface AuditoriaUserDto extends EntityDto<string> {
  nombre?: string;
  apellido?: string;
  nombreCompleto?: string;
  email?: string;
}

export interface GetEventosAuditoriaDto {
  eventoId?: string;
  nombreEvento?: string;
  proximaFuncion?: string;
}
