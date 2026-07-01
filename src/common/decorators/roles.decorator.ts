import { SetMetadata } from '@nestjs/common';
import { UserRoleName } from '../enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoleName[]) =>
  SetMetadata(ROLES_KEY, roles);
