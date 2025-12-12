import type { EntityDto } from '@abp/ng.core';
import type { Rol } from '../../rol.enum';

export interface TutorialDto extends EntityDto<string> {
  titulo?: string;
  url?: string;
  posicion: number;
  rol: Rol;
}
