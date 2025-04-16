import { IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';

import { ActionEnum } from '../../enums/action.enum';
import { Role } from '@/user/schemas/Role.schema';

export class CreatePermissionDto {
  @IsEnum(ActionEnum)
  @IsNotEmpty()
  action: ActionEnum;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  role: string;

  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  entity: string;
}
