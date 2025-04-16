import { RoleService } from '@/user/services/role.service';
import { UserService } from '@/user/services/user.service';
import { BaseSeeder } from '@/utils/generics/base-seeder';
import { Injectable, Logger } from '@nestjs/common';
import { userSeeds } from './user.seed-data';
import { User } from '@/user/schemas/user-schema/User.schema';

@Injectable()
export class UserSeeder extends BaseSeeder<User> {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {
    super(User.name, userService);
  }

  async seed() {
    const roles: any[] = await this.roleService.findAll();
    const roleIds = roles.map((role) => role.id.toString());

    await this.seedData(userSeeds(roleIds));
  }
}
