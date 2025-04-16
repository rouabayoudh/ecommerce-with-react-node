import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';

import { ActionEnum } from '../../enums/action.enum';

export class UpdatePermissionDto {
  @IsEnum(ActionEnum)
  @IsOptional()
  action: ActionEnum;

  @IsString()
  @IsMongoId()
  @IsOptional()
  role: string;

  @IsString()
  @IsOptional()
  @IsMongoId()
  entity: string;
}
