import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { BaseService } from '@/utils/generics/base.service';

import { Role } from '../schemas/Role.schema';

@Injectable()
export class RoleService extends BaseService<Role> {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {
    super(roleModel, Role);
  }

  async undeleteRole(roleId: string): Promise<Role> {
    const role = await this.roleModel
      .findOne({ _id: roleId, deletedAt: { $ne: null } })
      .exec();

    if (!role) {
      throw new NotFoundException(
        `Role with ID ${roleId} Not Found or Not Deleted`,
      );
    }

    role.deletedAt = null;
    await role.save();
    return role;
  }
}
