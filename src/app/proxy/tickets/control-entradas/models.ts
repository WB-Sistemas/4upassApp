import type { EntityDto } from '@abp/ng.core';
import type { TipoControlEntrada } from '../tipo-control/tipo-control-entrada.enum';
import type { SeccionEntradaSectoreYPreciosDTO } from '../seccion-entradas-dto/models';

export interface ControlEntradasDTO extends EntityDto<string> {
  eventoId?: string;
  tipoControl: TipoControlEntrada;
}

export interface ControlEntradasInputDTO {
  control: ControlEntradasDTO;
  tipoControl: TipoControlEntrada;
  secciones: SeccionDTO[];
}

export interface ControlEntradasOutputDTO {
  control: ControlEntradasDTO;
  secciones: SeccionOutputDTO[];
}

export interface SeccionDTO {
  nombre?: string;
  num: number;
  sectoresYPrecios: SeccionEntradaSectoreYPreciosDTO[];
}

export interface SeccionOutputDTO extends EntityDto<string> {
  nombre?: string;
  num: number;
  sectoresYPrecios: SeccionEntradaSectoreYPreciosDTO[];
}
