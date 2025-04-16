import { AppEntityService } from '@/user/services/app-entity.service';
import { PermissionService } from '@/user/services/permission.service';
import { RoleService } from '@/user/services/role.service';
import { BaseSeeder } from '@/utils/generics/base-seeder';
import { Injectable, Logger } from '@nestjs/common';
import { permissionSeeds } from './permission.seed-data';
import { Permission } from '@/user/schemas/Permission.schema';

@Injectable()
export class PermissionSeeder extends BaseSeeder<Permission> {
  constructor(
    private readonly permissionsService: PermissionService,
    private readonly roleService: RoleService,
    private readonly appEntityService: AppEntityService,
  ) {
    super(Permission.name, permissionsService);
  }

  async seed() {
    const adminRole = (await this.roleService.findOne({ name: 'ADMIN' })).id;

    const entities: any[] = await this.appEntityService.findAll();
    const permissions = entities.reduce((acc, entity) => {
      return acc.concat(permissionSeeds(adminRole, entity.id));
    }, []);

    await this.seedData(permissions);
  }
}
