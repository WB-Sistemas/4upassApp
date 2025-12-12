
export interface GetIdDto {
  id?: string;
}

export interface GetGrupoIdDto extends GetIdDto {
  filtrarPorVentas?: boolean;
}

export interface GetEventoFuncionIdDto {
  eventoId?: string;
  funcionId?: string;
}

export interface GetIdListDto {
  ids: string[];
}
