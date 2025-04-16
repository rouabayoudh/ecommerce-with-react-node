import { CreatePermissionDto } from '@/user/dtos/permission-dtos/create-permission.dto';
import { ActionEnum } from '@/user/enums/action.enum';
import { Role } from '@/user/schemas/Role.schema';

export const permissionSeeds = (
  role: string,
  entity: string,
): CreatePermissionDto[] => [
  {
    action: ActionEnum.CREATE,
    role,
    entity: entity,
  },
  {
    action: ActionEnum.UPDATE,
    role,
    entity: entity,
  },
  {
    action: ActionEnum.READ,
    role,
    entity: entity,
  },
  {
    action: ActionEnum.DELETE,
    role,
    entity: entity,
  },
];
