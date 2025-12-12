import type { EntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface ArchivoDto extends EntityDto<string> {
  nombre?: string;
  nombreNormalizado?: string;
  url?: string;
  preSignedUrl?: string;
  externo: boolean;
  privado: boolean;
}

export interface GetArchivosListDto extends PagedAndSortedResultRequestDto {
  nombre?: string;
}

export interface UpdateArchivoDto extends EntityDto<string> {
  nombre?: string;
}
