import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PermissionController } from './controllers/permission.contoller';
import { RoleController } from './controllers/role.controller';
import { UserController } from './controllers/user.controller';
import { AppEntity, AppEntitySchema } from './schemas/AppEntity.schema';
import { Permission, PermissionSchema } from './schemas/Permission.schema';
import { Role, RoleSchema } from './schemas/Role.schema';
import { User, UserSchema } from './schemas/user-schema/User.schema';
import { AppEntityService } from './services/app-entity.service';
import { PermissionService } from './services/permission.service';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Role.name,
        schema: RoleSchema,
      },
      {
        name: Permission.name,
        schema: PermissionSchema,
      },
      {
        name: AppEntity.name,
        schema: AppEntitySchema,
      },
    ]),
  ],
  controllers: [UserController, RoleController, PermissionController],
  providers: [UserService, RoleService, AppEntityService, PermissionService],
  exports: [UserService, RoleService, AppEntityService, PermissionService],
})
export class UserModule {}
