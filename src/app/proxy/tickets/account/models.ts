
export interface UserIsActiveDto {
  exists: boolean;
  isActive: boolean;
}

export interface UserRolesResultDto {
  email?: string;
  exists: boolean;
  inRoles: boolean;
}

export interface UsersInRolesRequestDto {
  emails: string[];
  roles: string[];
}
