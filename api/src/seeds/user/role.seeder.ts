import { BaseSeeder } from '@/utils/generics/base-seeder';
import { Injectable, Logger } from '@nestjs/common';
import { roleSeeds } from './role.seed-data';
import { RoleService } from '@/user/services/role.service';
import { Role } from '@/user/schemas/Role.schema';

@Injectable()
export class RoleSeeder extends BaseSeeder<Role> {
  constructor(private readonly roleService: RoleService) {
    super(Role.name, roleService);
  }

  async seed() {
    await this.seedData(roleSeeds);
  }
}
